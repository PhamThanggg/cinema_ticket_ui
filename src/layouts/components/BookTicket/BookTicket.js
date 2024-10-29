import classNames from 'classnames/bind';
import styles from './BookTicket.module.scss';
import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import MovieCinemaTime from './MovieCinemaTime/MovieCinemaTime';
import BookingSeat from './BookingSeat';
import Payment from './Payment';
import FoodSelection from './FoodSelection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';
import { PaymentVNPay } from '~/service/PaymentService';
import { CreateInvoiceApi } from '~/service/InvocieService';

const cx = classNames.bind(styles);

function BookTicket({ dataArea }) {
    const { state } = useAuth();
    const { account, token } = state;

    const tabTitles = ['Chọn phim / Rạp / Suất', 'Chọn ghế', 'Chọn thức ăn', 'Thanh toán', 'Xác nhận'];
    const tabs = ['ticketInfo', 'bookingSeat', 'foodInfo', 'payment', 'confirmation'];
    const hash = window.location.hash.replace('#', '');

    const [activeTab, setActiveTab] = useState(tabs.includes(hash) ? hash : 'ticketInfo');
    const navigate = useNavigate();
    const [area, setArea] = useState(null);
    const [movie, setMovie] = useState(null);
    const [schedule, setSchedule] = useState(null);

    const [seat, setSeat] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalAll, setTotalAll] = useState(0);

    const [item, setItem] = useState([]);

    const currentIndex = tabs.indexOf(activeTab);
    // console.log(area, movie, schedule);

    const STORAGE_DURATION = 5 * 60 * 1000;

    const getStoredValue = (key) => {
        const storedItem = JSON.parse(localStorage.getItem(key));
        if (storedItem) {
            const { value, timestamp } = storedItem;
            if (Date.now() - timestamp < STORAGE_DURATION) {
                return value;
            } else {
                localStorage.removeItem(key);
            }
        }
        return '';
    };

    if (selectedSeats.length > 0) {
        var seatNumbers = selectedSeats.map((seat) => seat.name).join(', ');
    }

    useEffect(() => {
        getStoredValue('area');
        getStoredValue('movie');
        getStoredValue('schedule');
        getStoredValue('seat');
        getStoredValue('totalPrice');
        // console.log(getStoredValue('schedule'));
    });

    useEffect(() => {
        if (!area && !movie && !schedule) {
            const storedArea = getStoredValue('area');
            const storedMovie = getStoredValue('movie');
            const storedSchedule = getStoredValue('schedule');
            const storedSeat = getStoredValue('seat');
            const storedTotalPrice = getStoredValue('totalPrice');
            const storedItem = getStoredValue('itemBooked');

            // console.log('local', storedSeat.value);
            if (storedArea && storedMovie && storedSchedule) {
                setArea(storedArea);
                setMovie(storedMovie);
                setSchedule(storedSchedule);
                setSelectedSeats(storedSeat);
                setTotal(storedTotalPrice);
            }

            if (storedItem) {
                setItem(storedItem);
            }
        }
    }, []);

    useEffect(() => {
        if (area && movie && schedule) {
            localStorage.setItem('area', JSON.stringify({ value: area, timestamp: Date.now() }));

            localStorage.setItem('movie', JSON.stringify({ value: movie, timestamp: Date.now() }));

            localStorage.setItem('schedule', JSON.stringify({ value: schedule, timestamp: Date.now() }));
        }
    }, [schedule]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message = 'Bạn có chắc chắn muốn tải lại trang? Việc này có thể khiến bạn mất dữ liệu.';
            event.preventDefault();
            event.returnValue = message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleNext = () => {
        if (area && movie && schedule && activeTab === 'ticketInfo') {
            if (currentIndex < tabs.length - 1) {
                const nextTab = tabs[currentIndex + 1];
                setActiveTab(nextTab);
                navigate(`#${nextTab}`);
                return;
            }
        }
        if (activeTab === 'bookingSeat' && selectedSeats.length > 0) {
            // add ghế chọn vào db

            if (currentIndex < tabs.length - 1) {
                const nextTab = tabs[currentIndex + 1];
                setActiveTab(nextTab);
                navigate(`#${nextTab}`);
                return;
            }
        }
        if (activeTab === 'foodInfo') {
            if (currentIndex < tabs.length - 1) {
                const nextTab = tabs[currentIndex + 1];
                setActiveTab(nextTab);
                navigate(`#${nextTab}`);
                return;
            }
        }
        if (activeTab === 'payment') {
            if (currentIndex < tabs.length - 1) {
                const nextTab = tabs[currentIndex + 1];
                setActiveTab(nextTab);
                navigate(`#${nextTab}`);
                return;
            }
        } else {
            toast.warning('Vui lòng chọn đủ thông tin');
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const prevTab = tabs[currentIndex - 1];
            setActiveTab(prevTab);
            navigate(`#${prevTab}`);
        }
    };

    // tính tiền vé
    useEffect(() => {
        var totalPrice = 0;
        if (schedule) {
            // console.log(selectedSeats, schedule?.price);
            let itemTotal = 0;
            if (selectedSeats.length > 0) {
                if (item.length > 0) {
                    item.forEach((data) => {
                        itemTotal += data.count * data.item.price;
                    });
                }
                selectedSeats.forEach((data) => {
                    totalPrice += data.seatType?.price + schedule.price;
                });
            }

            setTotal(totalPrice);
            setTotalAll(total + itemTotal);
        }
    }, [selectedSeats, total, schedule, item]);

    useEffect(() => {
        if (selectedSeats.length > 0) {
            localStorage.setItem('seat', JSON.stringify({ value: selectedSeats, timestamp: Date.now() }));
            localStorage.setItem('totalPrice', JSON.stringify({ value: total, timestamp: Date.now() }));
        }
    }, [selectedSeats]);

    useEffect(() => {
        if (item.length > 0) {
            localStorage.setItem('itemBooked', JSON.stringify({ value: item, timestamp: Date.now() }));
        }
    }, [item]);

    // thanh toán
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [paymentResponse, setPaymentResponse] = useState(null);

    const handlePayment = async () => {
        const seatId = [];
        const itemBuy = [];

        if (selectedSeats.length > 0) {
            selectedSeats.map((data) => seatId.push(data.id));
        }

        if (item.length > 0) {
            item.map((data) =>
                itemBuy.push({
                    item_id: data.item.id,
                    quantity: data.count,
                }),
            );
        }

        if (schedule && schedule.ScheduleId && seatId.length > 0 && totalAll && token) {
            //tạo order
            const orderData = {
                scheduleID: schedule.ScheduleId,
                cinemaSeatId: seatId,
                ticketTypeId: 1,
                total_amount: totalAll,
                cinema_id: 1,
                invoiceItems: itemBuy,
            };

            const orderRes = await CreateInvoiceApi(orderData, token);
            console.log(orderRes.result);
            // payment
            if (orderRes && orderRes.result) {
                const paymentLink = await PaymentVNPay(orderRes.result.id, orderRes.result.totalAmount, token);
                console.log(paymentLink);
                if (paymentLink && paymentLink.body && paymentLink.body.data) {
                    window.location.href = paymentLink.body.data;
                } else {
                    console.error('Lỗi khi tạo link thanh toán');
                }
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('information')}>
                <div className={cx('nav')}>
                    <div className={cx('account-nav')}>
                        <ul className={cx('tablist')}>
                            {tabs.map((tab, index) => (
                                <li className={cx('item')} key={tab}>
                                    <div
                                        className={cx(
                                            'item-link',
                                            index === currentIndex ? 'nav-active' : '',
                                            index < currentIndex ? 'nav-active-before' : '',
                                        )}
                                    >
                                        {tabTitles[index]}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className={cx('nav-line')}></div> */}
                </div>
            </div>

            <div className={cx('booking')}>
                <div className={cx('order')}>
                    {activeTab === 'ticketInfo' && (
                        <MovieCinemaTime
                            dataArea={dataArea}
                            setAreaData={setArea}
                            setMovieData={setMovie}
                            setScheduleData={setSchedule}
                        />
                    )}
                    {activeTab === 'bookingSeat' && (
                        <BookingSeat
                            seatData={seat}
                            setSeatData={setSeat}
                            selectedSeats={selectedSeats}
                            setSelectedSeats={setSelectedSeats}
                            account={account}
                            schedule={schedule}
                        />
                    )}
                    {activeTab === 'foodInfo' && <FoodSelection item={item} setItem={setItem} />}
                    {activeTab === 'payment' && (
                        <Payment
                            selectedPaymentMethod={selectedPaymentMethod}
                            setSelectedPaymentMethod={setSelectedPaymentMethod}
                        />
                    )}
                </div>
                {/* thong tin booking */}
                <div className={cx('order-detail')}>
                    <div className={cx('detail-ctn')}>
                        <div className={cx('bgr-order')}>
                            <div className={cx('order-img')}>
                                <img
                                    className={cx('order-detail-img')}
                                    src={
                                        movie?.images[0]?.imageUrl ||
                                        'https://www.galaxycine.vn/_next/static/media/img-blank.bb695736.svg'
                                    }
                                    alt=""
                                />
                                <div className={cx('movie-booking')}>
                                    <div className={cx('name-movie')}>{movie?.nameMovie || ''}</div>
                                    <p className={cx('movie-info')}>
                                        {movie && '2D phụ đề -'}
                                        {movie && <span className={cx('movie-age')}>{movie?.ageLimit || ''}</span>}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('order-cinema')}>
                                {schedule?.cinemaName || ''} {movie?.schedule && '-'} {schedule?.roomName || ''}
                            </div>

                            {schedule && <OrderTime dateString={schedule?.startTime || ''} />}

                            {selectedSeats.length > 0 && (
                                <div>
                                    <div className={cx('line')}></div>
                                    <div className={cx('order-seat')}>
                                        <div>
                                            <p className={cx('seat-type')}>
                                                <b>{selectedSeats.length}x</b> Ghế đơn
                                            </p>
                                            <p className={cx('seat')}>
                                                Ghế: <b>{seatNumbers}</b>
                                            </p>
                                        </div>
                                        <div className={cx('price-seat')}>
                                            <b>{total} ₫</b>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={cx('line')}></div>
                            {item.length > 0 &&
                                item.map(
                                    (data, index) =>
                                        data.count !== 0 && (
                                            <div className={cx('order-food')} key={index}>
                                                <div className={cx('food-name')}>
                                                    <b>{data.count}X</b> {data.item.name}
                                                </div>
                                                <p className={cx('food-price')}>
                                                    {data.item.price * data?.count || 1} ₫
                                                </p>
                                            </div>
                                        ),
                                )}

                            {item.length > 0 && <div className={cx('line')}></div>}

                            <div className={cx('order-total')}>
                                <div className={cx('total-name')}>Tổng cộng</div>
                                <p className={cx('total-price')}> {totalAll} ₫</p>
                            </div>
                        </div>

                        <div className={cx('order-btn')}>
                            <Button outline onClick={handlePrevious} disabled={currentIndex === 0}>
                                Quay lại
                            </Button>
                            {activeTab !== 'payment' && (
                                <Button primary onClick={handleNext} disabled={currentIndex === tabs.length - 1}>
                                    Tiếp tục
                                </Button>
                            )}
                            {activeTab === 'payment' && (
                                <Button primary onClick={handlePayment} disabled={currentIndex === tabs.length - 1}>
                                    Thanh toán
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const OrderTime = ({ dateString }) => {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = dayNames[date.getDay()];

    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return (
        <div className={cx('order-time')}>
            Suất: {hours}:{minutes} - {dayName}, {day}/{month}/{year}
        </div>
    );
};
export default BookTicket;
