import classNames from 'classnames/bind';
import styles from './BookTicket.module.scss';
import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import MovieCinemaTime from './MovieCinemaTime/MovieCinemaTime';
import BookingSeat from './BookingSeat';
import Payment from './Payment';
import FoodSelection from './FoodSelection';
import Confirmation from './Confirmation';

const cx = classNames.bind(styles);

function BookTicket({ dataArea }) {
    const [activeTab, setActiveTab] = useState(() => {
        return sessionStorage.getItem('activeTab') || 'ticketInfo';
    });

    const [clickedTabs, setClickedTabs] = useState(['ticketInfo']);

    const [area, setArea] = useState(null);
    const [movie, setMovie] = useState(null);
    const [schedule, setSchedule] = useState(null);

    console.log(area, movie, schedule);

    const tabTitles = ['Chọn phim / Rạp / Suất', 'Chọn ghế', 'Chọn thức ăn', 'Thanh toán', 'Xác nhận'];

    const tabs = ['ticketInfo', 'personalInfo', 'foodInfo', 'payment', 'confirmation'];

    const currentIndex = tabs.indexOf(activeTab);

    const handleNext = () => {
        // Go to the next tab in sequence
        if (currentIndex < tabs.length - 1) {
            const nextTab = tabs[currentIndex + 1];
            setActiveTab(nextTab);

            // Mark tab as visited
            if (!clickedTabs.includes(nextTab)) {
                setClickedTabs([...clickedTabs, nextTab]);
            }
        }
    };

    const handlePrevious = () => {
        // Go to the previous tab in sequence
        if (currentIndex > 0) {
            const prevTab = tabs[currentIndex - 1];
            setActiveTab(prevTab);
        }
    };

    useEffect(() => {
        sessionStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

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
                                            index === currentIndex ? 'nav-active' : clickedTabs.includes(tab),
                                            index < currentIndex ? 'nav-active-before' : clickedTabs.includes(tab),
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
                    {activeTab === 'personalInfo' && <BookingSeat />}
                    {activeTab === 'foodInfo' && <FoodSelection />}
                    {activeTab === 'payment' && <Payment />}
                    {activeTab === 'confirmation' && <Confirmation />}
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

                            <div className={cx('line')}></div>
                            <div className={cx('order-seat')}>
                                <div>
                                    <p className={cx('seat-type')}>
                                        <b>2x</b> Ghế đơn
                                    </p>
                                    <p className={cx('seat')}>
                                        Ghế: <b>H1, H2</b>
                                    </p>
                                </div>
                                <div className={cx('price-seat')}>
                                    <b>110000 ₫</b>
                                </div>
                            </div>
                            <div className={cx('line')}></div>
                            <div className={cx('order-food')}>
                                <div className={cx('food-name')}>
                                    <b>1X</b> iCombo 1 Big STD
                                </div>
                                <p className={cx('food-price')}>110000 ₫</p>
                            </div>
                            <div className={cx('line')}></div>
                            <div className={cx('order-total')}>
                                <div className={cx('total-name')}>Tổng cộng</div>
                                <p className={cx('total-price')}> 350000 ₫</p>
                            </div>
                        </div>

                        <div className={cx('order-btn')}>
                            <Button outline onClick={handlePrevious} disabled={currentIndex === 0}>
                                Quay lại
                            </Button>
                            <Button primary onClick={handleNext} disabled={currentIndex === tabs.length - 1}>
                                Tiếp tục
                            </Button>
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
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return (
        <div className={cx('order-time')}>
            Suất: {hours}:{minutes} - {dayName}, {day}/{month}/{year}
        </div>
    );
};
export default BookTicket;
