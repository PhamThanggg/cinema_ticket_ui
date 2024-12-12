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
import { formatDateToCustomFormat } from '~/utils/dateFormatter';
import { formatVND } from '~/utils/vndPrice';
import { confirmAction } from '~/components/ConfirmAction/ConfirmAction';

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

    const [regularSeats, setRegularSeats] = useState([]);
    const [vipSeats, setVipSeats] = useState([]);
    const [doubleSeats, setDoubleSeats] = useState([]);
    const [priceRegular, setPriceRegular] = useState(0);
    const [priceVip, setPriceVip] = useState(0);
    const [priceDouble, setPriceDouble] = useState(0);

    const [promotion, setPromotion] = useState('');
    const [star, setStar] = useState(null);

    const currentIndex = tabs.indexOf(activeTab);

    console.log(area, movie, schedule);

    useEffect(() => {
        if (!area && !movie && !schedule) {
            const storedArea = localStorage.getItem('area');
            const storedMovie = localStorage.getItem('movie');
            const storedSchedule = localStorage.getItem('schedule');
            const storedSeat = localStorage.getItem('seat');
            const storedTotalPrice = localStorage.getItem('totalPrice');
            const storedItem = localStorage.getItem('itemBooked');
            const storedStar = localStorage.getItem('start');
            const storedPromotion = localStorage.getItem('promotion');

            if (storedArea && storedMovie && storedSchedule) {
                setArea(JSON.parse(storedArea));
                setMovie(JSON.parse(storedMovie));
                setSchedule(JSON.parse(storedSchedule));
            }

            if (storedSeat && storedTotalPrice) {
                setSelectedSeats(JSON.parse(storedSeat));
                setTotal(storedTotalPrice);
            }

            if (storedItem) {
                setItem(JSON.parse(storedItem));
            }

            if (storedPromotion) {
                setPromotion(JSON.parse(storedPromotion));
            }

            if (storedStar) {
                setStar(storedStar);
            }
        }
    }, []);

    useEffect(() => {
        if (area && movie && schedule) {
            localStorage.setItem('area', JSON.stringify(area));

            localStorage.setItem('movie', JSON.stringify(movie));

            localStorage.setItem('schedule', JSON.stringify(schedule));
        }
    }, [schedule]);

    const handleNext = () => {
        if (area && movie && schedule && activeTab === 'ticketInfo') {
            if (currentIndex < tabs.length - 1) {
                const nextTab = tabs[currentIndex + 1];
                setActiveTab(nextTab);
                navigate(`#${nextTab}`);
                return;
            }
        }
        if (activeTab === 'bookingSeat' && selectedSeats && selectedSeats.length > 0) {
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
            let itemTotal = 0;
            if (selectedSeats && selectedSeats.length > 0) {
                if (item.length > 0) {
                    item.forEach((data) => {
                        itemTotal += data.count * data.item.price;
                    });
                }
                selectedSeats.forEach((data) => {
                    totalPrice += data.seatType?.price + schedule.price;
                });
            }

            totalPrice += itemTotal;
            if (star && star >= 20 && star <= 100) {
                totalPrice -= star * 1000;
            }

            if (promotion && promotion.discountType === 'PHAN_TRAM') {
                totalPrice -= (totalPrice * promotion.discount) / 100;
            } else if (promotion && promotion.discountType === 'TIEN') {
                totalPrice -= promotion.discount;
            }

            setTotal(totalPrice);
            setTotalAll(totalPrice);
        }
    }, [selectedSeats, total, schedule, item, promotion, star]);

    useEffect(() => {
        if (selectedSeats && selectedSeats.length > 0) {
            localStorage.setItem('seat', JSON.stringify(selectedSeats));
            localStorage.setItem('totalPrice', JSON.stringify(totalAll));

            const timestamp = localStorage.getItem('timestamp');
            if (!timestamp || Date.now() > parseInt(timestamp)) {
                const currentTime = Date.now();

                const expiryTime = currentTime + 10 * 60 * 1000;

                localStorage.setItem('timestamp', expiryTime.toString());
            }
        } else {
            localStorage.removeItem('seat');
            localStorage.removeItem('totalPrice');
        }
    }, [selectedSeats]);

    useEffect(() => {
        if (item && item.length > 0) {
            localStorage.setItem('itemBooked', JSON.stringify(item));
        }
    }, [item]);

    // thanh toán
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const handlePayment = async () => {
        const seatId = [];
        const itemBuy = [];

        if (selectedPaymentMethod === 'vnpay') {
            if (selectedSeats && selectedSeats.length > 0) {
                selectedSeats.map((data) => seatId.push(data.id));
            }

            if (item && item.length > 0) {
                item.map((data) =>
                    itemBuy.push({
                        item_id: data.item.id,
                        quantity: data.count,
                    }),
                );
            }

            if (schedule && schedule.ScheduleId && seatId && seatId.length > 0 && totalAll && token) {
                //tạo order
                const date = new Date(Number(localStorage.getItem('timestamp')));
                const expiryTime = formatDateToCustomFormat(date);
                const orderData = {
                    scheduleID: schedule.ScheduleId,
                    cinemaSeatId: seatId,
                    ticketTypeId: 1,
                    total_amount: totalAll,
                    cinema_id: schedule.cinemaId,
                    invoiceItems: itemBuy,
                    paymentExpirationTime: expiryTime,
                    promotionId: promotion.id || null,
                    star: star,
                };

                const orderRes = await CreateInvoiceApi(orderData, token);
                // payment
                if (orderRes && orderRes.result) {
                    const storedTimestamp = Number(localStorage.getItem('timestamp'));
                    const remainingMinutes = Math.max(0, Math.floor((storedTimestamp - Date.now()) / 60000));
                    const paymentLink = await PaymentVNPay(
                        orderRes.result.id,
                        orderRes.result.totalAmount,
                        remainingMinutes,
                        token,
                    );
                    if (paymentLink && paymentLink.body && paymentLink.body.data) {
                        window.location.href = paymentLink.body.data;
                    } else {
                        console.error('Lỗi khi tạo link thanh toán');
                    }
                }
            }
        } else {
            toast.warning('Vui lòng chọn phương thức thanh toán');
        }
    };

    // thời gian giữ vé
    const expiryTime = localStorage.getItem('timestamp');
    const [timeLeft, setTimeLeft] = useState(() => {
        if (expiryTime) {
            return parseInt(expiryTime) - Date.now();
        } else {
            return 0;
        }
    });

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (expiryTime && timeLeft && timeLeft <= 0) {
            cleanUpAndNavigate();
            return;
        }

        const timer = setInterval(() => {
            const currentTime = Date.now();
            const newTimeLeft = parseInt(expiryTime, 10) - currentTime;

            setTimeLeft(newTimeLeft);
            if (newTimeLeft <= 0) {
                clearInterval(timer);
                cleanUpAndNavigate();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryTime, timeLeft, navigate, selectedSeats]);

    useEffect(() => {
        if (selectedSeats && selectedSeats.length > 0 && schedule) {
            const regularSeats = selectedSeats.filter((seat) => seat.seatType.id === 1);
            const vipSeats = selectedSeats.filter((seat) => seat.seatType.id === 2);
            const doubleSeats = selectedSeats.filter((seat) => seat.seatType.id === 3);

            if (regularSeats && regularSeats.length > 0) {
                setRegularSeats(regularSeats);
                const regularTotal = regularSeats.reduce((sum, seat) => sum + seat.seatType.price + schedule.price, 0);
                setPriceRegular(regularTotal);
            } else {
                setRegularSeats([]);
            }

            if (vipSeats && vipSeats.length > 0) {
                setVipSeats(vipSeats);
                const vipTotal = vipSeats.reduce((sum, seat) => sum + seat.seatType.price + schedule.price, 0);
                setPriceVip(vipTotal);
            } else {
                setVipSeats([]);
            }

            if (doubleSeats && doubleSeats.length > 0) {
                setDoubleSeats(doubleSeats);
                const doubleTotal = doubleSeats.reduce((sum, seat) => sum + seat.seatType.price + schedule.price, 0);
                setPriceDouble(doubleTotal);
            } else {
                setDoubleSeats([]);
            }
        } else {
            setRegularSeats([]);
            setVipSeats([]);
            setDoubleSeats([]);
        }
    }, [selectedSeats]);

    const cleanUpAndNavigate = () => {
        localStorage.removeItem('area');
        localStorage.removeItem('movie');
        localStorage.removeItem('schedule');
        localStorage.removeItem('seat');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('timestamp');
        localStorage.removeItem('itemBooked');
        localStorage.removeItem('star');
        localStorage.removeItem('promotion');
        localStorage.removeItem('itemBooked');
        navigate('/booking');
        window.location.reload();
    };

    const handleRemoveStar = async () => {
        const res = await confirmAction('Bỏ áp dụng điểm star', null);
        if (res) {
            localStorage.removeItem('star');
            setStar(null);
            toast.success('Đã bỏ áp dụng điểm star');
        }
    };

    const handleRemoveDiscount = async () => {
        const res = await confirmAction('Bỏ áp dụng mã giảm giá', null);
        if (res) {
            localStorage.removeItem('promotion');
            setPromotion('');
            toast.success('Đã bỏ áp dụng mã giảm giá');
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
                            setPromotion={setPromotion}
                            setStar={setStar}
                        />
                    )}
                </div>
                {/* thong tin booking */}
                <div className={cx('order-detail')}>
                    <div className={cx('detail-ctn')}>
                        {expiryTime && (
                            <div className={cx('time_select')}>
                                Thời gian giữ ghế : <span>{timeLeft > 0 ? formatTime(timeLeft) : '00:00'}</span>
                            </div>
                        )}
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

                            {regularSeats && regularSeats.length > 0 && (
                                <div>
                                    <div className={cx('line')}></div>
                                    <div className={cx('order-seat')}>
                                        <div>
                                            <p className={cx('seat-type')}>
                                                <b>{regularSeats && regularSeats.length}x</b> Ghế thường
                                            </p>
                                            <p className={cx('seat')}>
                                                Ghế: <b>{regularSeats.map((seat) => seat.name).join(', ')}</b>
                                            </p>
                                        </div>
                                        <div className={cx('price-seat')}>
                                            <b>{formatVND(priceRegular)}</b>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {vipSeats && vipSeats.length > 0 && (
                                <div>
                                    <div className={cx('line')}></div>
                                    <div className={cx('order-seat')}>
                                        <div>
                                            <p className={cx('seat-type')}>
                                                <b>{vipSeats && vipSeats.length}x</b> Ghế vip
                                            </p>
                                            <p className={cx('seat')}>
                                                Ghế: <b>{vipSeats.map((seat) => seat.name).join(', ')}</b>
                                            </p>
                                        </div>
                                        <div className={cx('price-seat')}>
                                            <b>{formatVND(priceVip)}</b>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {doubleSeats && doubleSeats.length > 0 && (
                                <div>
                                    <div className={cx('line')}></div>
                                    <div className={cx('order-seat')}>
                                        <div>
                                            <p className={cx('seat-type')}>
                                                <b>{doubleSeats && doubleSeats.length}x</b> Ghế đôi
                                            </p>
                                            <p className={cx('seat')}>
                                                Ghế: <b>{doubleSeats.map((seat) => seat.name).join(', ')}</b>
                                            </p>
                                        </div>
                                        <div className={cx('price-seat')}>
                                            <b>{formatVND(priceDouble)}</b>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {item &&
                                item.length > 0 &&
                                item.map(
                                    (data, index) =>
                                        data.count !== 0 && (
                                            <div key={index}>
                                                <div className={cx('line')}></div>
                                                <div className={cx('order-food')} key={index}>
                                                    <div className={cx('food-name')}>
                                                        <b>{data.count}X</b> {data.item.name}
                                                    </div>
                                                    <p className={cx('food-price')}>
                                                        {formatVND(data.item.price * data?.count || 1)}
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                )}

                            {star && (
                                <>
                                    <div className={cx('line-star')}></div>
                                    <div className={cx('order-food', 'hover-star')} onClick={handleRemoveStar}>
                                        <div className={cx('food-name')}>Điểm Star</div>
                                        <p className={cx('food-price')}>-{formatVND(star * 1000)}</p>
                                    </div>
                                </>
                            )}
                            {promotion && (
                                <>
                                    {star ? (
                                        <div className={cx('line-discount')}></div>
                                    ) : (
                                        <div className={cx('line-star')}></div>
                                    )}
                                    <div className={cx('order-food', 'hover-star')} onClick={handleRemoveDiscount}>
                                        <div className={cx('food-name')}>Giảm giá</div>
                                        <p className={cx('food-price')}>
                                            {promotion.discountType === 'PHAN_TRAM'
                                                ? `${promotion.discount}%`
                                                : `-${promotion.discount}`}
                                        </p>
                                    </div>
                                </>
                            )}

                            {star || promotion ? (
                                <div className={cx('line-end')}></div>
                            ) : (
                                <div className={cx('line')}></div>
                            )}

                            <div className={cx('order-total')}>
                                <div className={cx('total-name')}>Tổng cộng</div>
                                <p className={cx('total-price')}> {formatVND(totalAll)}</p>
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
