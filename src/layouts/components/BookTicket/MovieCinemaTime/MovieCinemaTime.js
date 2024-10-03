import classNames from 'classnames/bind';
import styles from './MovieCinemaTime.module.scss';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import MovieBooking from './MovieBooking';
import DateSlider from '../../../../components/DateTime/DateTime';

const cx = classNames.bind(styles);

function MovieCinemaTime() {
    // slide
    const [isVisible, setIsVisible] = useState('place');
    const [maxHeights, setMaxHeights] = useState({
        place: '0px',
        movie: '0px',
        time: '0px',
    });
    const contentRefs = {
        place: useRef(null),
        movie: useRef(null),
        time: useRef(null),
    };

    const toggleDownUp = (tab) => {
        if (isVisible === tab) {
            setIsVisible('');
        } else {
            setIsVisible(tab);
        }
    };

    useEffect(() => {
        if (isVisible) {
            setMaxHeights((prevHeights) => ({
                ...prevHeights,
                [isVisible]: `${contentRefs[isVisible].current.scrollHeight}px`,
            }));
        }

        // Đặt lại chiều cao cho các phần không được chọn
        Object.keys(maxHeights).forEach((key) => {
            if (key !== isVisible) {
                setMaxHeights((prevHeights) => ({
                    ...prevHeights,
                    [key]: '0px',
                }));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('order-ctn')}>
                <div className={cx('order-place')}>
                    <h3 className={cx('title-place')}>Chọn vị trí</h3>
                    <div className={cx('btn-hide', { hidden: isVisible !== 'place' })}>
                        <FontAwesomeIcon
                            className={cx('icon')}
                            onClick={() => toggleDownUp('place')}
                            icon={faCaretUp}
                        />
                    </div>
                    <div className={cx('btn-show', { hidden: isVisible === 'place' })}>
                        <FontAwesomeIcon
                            className={cx('icon')}
                            onClick={() => toggleDownUp('place')}
                            icon={faCaretDown}
                        />
                    </div>
                </div>

                <div
                    ref={contentRefs.place}
                    style={{
                        maxHeight: maxHeights.place,
                        transition: 'max-height 0.5s ease',
                        overflow: 'hidden',
                    }}
                    className={cx('title-content', { visible: isVisible === 'place' })}
                >
                    <button className={cx('place')}>Hà nội</button>
                </div>
            </div>

            <div className={cx('order-ctn')}>
                <div className={cx('order-place')}>
                    <h3 className={cx('title-place')}>Chọn phim</h3>
                    <div className={cx('btn-hide', { hidden: isVisible !== 'movie' })}>
                        <FontAwesomeIcon
                            className={cx('icon')}
                            onClick={() => toggleDownUp('movie')}
                            icon={faCaretUp}
                        />
                    </div>
                    <div className={cx('btn-show', { hidden: isVisible === 'movie' })}>
                        <FontAwesomeIcon
                            className={cx('icon')}
                            onClick={() => toggleDownUp('movie')}
                            icon={faCaretDown}
                        />
                    </div>
                </div>

                <div
                    ref={contentRefs.movie}
                    style={{
                        maxHeight: maxHeights.movie,
                        transition: 'max-height 0.5s ease',
                        overflow: 'hidden',
                    }}
                    className={cx('title-content', { visible: isVisible === 'movie' })}
                >
                    <MovieBooking />
                    <div style={{ height: '10px' }}></div>
                </div>
            </div>

            <div className={cx('order-ctn')}>
                <div className={cx('order-place')}>
                    <h3 className={cx('title-place')}>Chọn suất</h3>
                    <div className={cx('btn-hide', { hidden: isVisible !== 'time' })}>
                        <FontAwesomeIcon className={cx('icon')} onClick={() => toggleDownUp('time')} icon={faCaretUp} />
                    </div>
                    <div className={cx('btn-show', { hidden: isVisible === 'time' })}>
                        <FontAwesomeIcon
                            className={cx('icon')}
                            onClick={() => toggleDownUp('time')}
                            icon={faCaretDown}
                        />
                    </div>
                </div>

                <div
                    ref={contentRefs.time}
                    style={{
                        maxHeight: maxHeights.time,
                        transition: 'max-height 0.5s ease',
                        overflow: 'hidden',
                    }}
                    className={cx('title-content', { visible: isVisible === 'time' })}
                >
                    <div className={cx('booking-time')}>
                        <div className={cx('booking-cinema')}>
                            <select className={cx('cinema-select')}>
                                <option>Tất cả các rạp</option>
                                <option>Rạp 1</option>
                            </select>
                        </div>
                        <div className={cx('booking-date')}>
                            <DateSlider />
                        </div>

                        <div className={cx('cinema-name')}>
                            <div className={cx('name-detail')}>
                                Rap 1 <span className={cx('name-pd')}>2D phụ đề</span>
                            </div>
                        </div>
                        <div className={cx('hour')}>
                            <button className={cx('btn-hour')}>14:00</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCinemaTime;
