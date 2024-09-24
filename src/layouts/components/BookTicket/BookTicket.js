import classNames from 'classnames/bind';
import styles from './BookTicket.module.scss';
import { useState } from 'react';
import Button from '~/components/Button';
import MovieCinemaTime from './MovieCinemaTime/MovieCinemaTime';
import BookingSeat from './BookingSeat';
import Payment from './Payment';
import FoodSelection from './FoodSelection';
import Confirmation from './Confirmation';

const cx = classNames.bind(styles);

function BookTicket() {
    const [activeTab, setActiveTab] = useState('ticketInfo'); // Default first tab
    const [clickedTabs, setClickedTabs] = useState(['ticketInfo']); // Keeps track of visited tabs

    const tabTitles = ['Chọn phim / Rạp / Suất', 'Chọn ghế', 'Chọn thức ăn', 'Thanh toán', 'Xác nhận'];

    const tabs = ['ticketInfo', 'personalInfo', 'foodInfo', 'payment', 'confirmation'];

    const currentIndex = tabs.indexOf(activeTab); // Get current tab index

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
                    {activeTab === 'ticketInfo' && <MovieCinemaTime />}
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
                                    src="https://cdn.galaxycine.vn/media/2024/9/9/cam-500_1725872473264.jpg"
                                    alt=""
                                />
                                <div className={cx('movie-booking')}>
                                    <div className={cx('name-movie')}>Cám </div>
                                    <p className={cx('movie-info')}>
                                        2D phụ đề - <span className={cx('movie-age')}>T18</span>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('order-cinema')}>Galaxy Mipec Long Biên - RAP 3</div>
                            <div className={cx('order-time')}>Suất: 20:15 - Thứ Ba, 24/09/2024</div>
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

export default BookTicket;
