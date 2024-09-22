import classNames from 'classnames/bind';
import styles from './BookTicket.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function BookTicket() {
    const [activeTab, setActiveTab] = useState('ticketInfo');

    const [isVisible, setIsVisible] = useState(false);
    const [maxHeight, setMaxHeight] = useState(null);
    const contentRef = useRef(null);

    const toggleContent = () => {
        setIsVisible((prev) => !prev);
    };

    useEffect(() => {
        if (isVisible) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setTimeout(() => {
                setMaxHeight('0px');
            }, 500);
        }
    }, [isVisible]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('information')}>
                <div className={cx('nav')}>
                    <div className={cx('account-nav')}>
                        <ul className={cx('tablist')}>
                            <li className={cx('item')}>
                                <Link
                                    className={cx('item-link', activeTab === 'ticketInfo' && 'nav-active')}
                                    to="#ticketInfo"
                                    onClick={() => setActiveTab('ticketInfo')}
                                >
                                    Chọn phim / Rạp / Suất
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link
                                    className={cx('item-link', activeTab === 'personalInfo' && 'nav-active')}
                                    to="#personalInfo"
                                    onClick={() => setActiveTab('personalInfo')}
                                >
                                    Chọn ghế
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link
                                    className={cx('item-link', activeTab === 'notification' && 'nav-active')}
                                    to="#notification"
                                    onClick={() => setActiveTab('notification')}
                                >
                                    Chọn thức ăn
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link
                                    className={cx('item-link', activeTab === 'notification' && 'nav-active')}
                                    to="#notification"
                                    onClick={() => setActiveTab('notification')}
                                >
                                    Thanh toán
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link
                                    className={cx('item-link', activeTab === 'notification' && 'nav-active')}
                                    to="#notification"
                                    onClick={() => setActiveTab('notification')}
                                >
                                    Xác nhận
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className={cx('nav-line')}></div> */}
                </div>
            </div>

            <div className={cx('booking')}>
                <div className={cx('order')}>
                    <div className={cx('order-ctn')}>
                        <div className={cx('order-place')}>
                            <h3 className={cx('title-place')}>Chọn vị trí</h3>
                            <div className={cx('btn-hide', { hidden: !isVisible })}>
                                <FontAwesomeIcon className={cx('icon')} onClick={toggleContent} icon={faCaretUp} />
                            </div>
                            <div className={cx('btn-show', { hidden: isVisible })}>
                                <FontAwesomeIcon className={cx('icon')} onClick={toggleContent} icon={faCaretDown} />
                            </div>
                        </div>

                        <div
                            ref={contentRef}
                            style={{ maxHeight: maxHeight, transition: 'max-height 0.5s ease', overflow: 'hidden' }}
                            className={cx('title-content', { visible: isVisible })}
                        >
                            <button className={cx('place')}>Hà nội</button>
                        </div>
                    </div>

                    <div className={cx('order-ctn')}>
                        <div className={cx('order-place')}>
                            <h3 className={cx('title-place')}>Chọn phim</h3>
                            {/* <div className={cx('btn-hide')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faCaretUp} />
                            </div> */}
                            <div className={cx('btn-show')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
                            </div>
                        </div>
                        {/* <div className={cx('title-content')}>Content</div> */}
                    </div>

                    <div className={cx('order-ctn')}>
                        <div className={cx('order-place')}>
                            <h3 className={cx('title-place')}>Chọn suất</h3>
                            {/* <div className={cx('btn-hide')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faCaretUp} />
                            </div> */}
                            <div className={cx('btn-show')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
                            </div>
                        </div>
                        {/* <div className={cx('title-content')}>Content</div> */}
                    </div>
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
                            <Button outline>Quay lại</Button>
                            <Button primary>Tiếp tục</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookTicket;
