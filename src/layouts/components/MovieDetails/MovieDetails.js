// import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MovieDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCirclePlay, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ClockIcon, ScheduleIcon, StarIcon } from '~/components/Icon';
// import { height } from '@mui/system';
import DateTime from '~/components/DateTime/DateTime';

const cx = classNames.bind(styles);

function MovieDetail() {
    // const location = useLocation();
    // const { movieId } = location.state || {};

    const [showTrailer, setShowTrailer] = useState(false);

    const handlePlayTrailer = () => {
        setShowTrailer(true);
    };

    const handleCloseTrailer = () => {
        setShowTrailer(false);
    };

    const [selectedLocation, setSelectedLocation] = useState('Toàn quốc');

    const handleChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const locations = [
        'Toàn quốc',
        'TP Hồ Chí Minh',
        'Nghệ An',
        'Thừa Thiên Huế',
        'An Giang',
        'Bà Rịa - Vũng Tàu',
        'Hải Phòng',
        'Đà Nẵng',
        'Khánh Hòa',
        // Add more locations as needed
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('trailer')} onClick={handlePlayTrailer}>
                <div className={cx('overlay', 'left')}></div>
                <img
                    className={cx('trailer_img')}
                    src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg"
                    alt=""
                />
                <FontAwesomeIcon className={cx('icon')} icon={faCirclePlay} />
            </div>

            {showTrailer && (
                <div className={cx('trailer-popup')} onClick={handleCloseTrailer}>
                    <div className={cx('trailer-container')} onClick={(e) => e.stopPropagation()}>
                        <iframe
                            width="1080"
                            height="480"
                            src={'https://www.youtube.com/embed/EjnPaUaWeWg'}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button onClick={handleCloseTrailer} className={cx('close-trailer')}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                </div>
            )}

            <div className={cx('detail')}>
                <div className={cx('ctn')}>
                    <div className={cx('left_ctn')}>
                        <div className={cx('content')}>
                            <img
                                className={cx('movie_img')}
                                src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"
                                alt=""
                            />
                            <div className={cx('content_ctn')}>
                                <div style={{ display: 'flex' }}>
                                    <h2 className={cx('movie_name')}>Transformers Một</h2>
                                    <div className={cx('age')}>T13</div>
                                </div>
                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                    <p className={cx('time')}>
                                        <ClockIcon /> <span>104 phút</span>
                                    </p>
                                    <p className={cx('date')}>
                                        <ScheduleIcon />
                                        <span> 27/9/2024</span>
                                    </p>
                                </div>
                                <div className={cx('votes')}>
                                    <StarIcon className={cx('star')} /> <p>4.5</p> <span>(199 votes)</span>
                                </div>
                                <div className={cx('country')}>
                                    Quốc gia: <span>Mỹ</span>
                                </div>
                                <div className={cx('director')}>
                                    Nhà sản xuất: <span>Thang Pham</span>
                                </div>
                                <div className={cx('genre')}>
                                    Thể loại:
                                    <span>Hành động</span>
                                </div>
                                <div className={cx('genre')}>
                                    Đạo diễn:
                                    <span>Thang pham</span>
                                </div>
                                <div className={cx('genre')}>
                                    Diễn viên:
                                    <span>Phạm Huy Thắng</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('movie-nd')}>Nội dung phim</div>
                        <p className={cx('nd')}>
                            Transformers Một là bộ phim hoạt hình Transformers đầu tiên sau 40 năm, và để kỷ niệm 40 năm
                            thương hiệu Transformers, bộ phim là câu chuyện gốc về quá trình Optimus Prime và Megatron
                            từ bạn thành thù. Lấy chủ đề câu chuyện phiêu lưu hài hước tràn ngập tình đồng đội cùng
                            những pha hành động và biến hình cực đã mắt, Transformer One hé lộ câu chuyện gốc được chờ
                            đợi bấy lâu về cách các nhân vật mang tính biểu tượng nhất trong vũ trụ Transformers - Orion
                            Pax và D-16 từ anh em chiến đấu trở thành Optimus Prime và Megatron - kẻ thù không đội trời
                            chung.
                        </p>

                        <div style={{ height: '200px', marginTop: '20px' }}>Comment</div>
                    </div>

                    <div className={cx('right_ctn')}>
                        <div className={cx('schedule')}>
                            <h2 className={cx('show_title')}>Lịch chiếu</h2>
                            <div className={cx('show_date')}>
                                <DateTime count={4} />
                            </div>
                            <div className={cx('select')}>
                                <div className={cx('show_area')}>
                                    <select
                                        className={cx('location-select')}
                                        value={selectedLocation}
                                        onChange={handleChange}
                                    >
                                        {locations.map((location, index) => (
                                            <option key={index} value={location}>
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                    <span className={cx('custom-arrow')}>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </span>
                                </div>

                                <div className={cx('show_area')}>
                                    <select
                                        className={cx('location-select')}
                                        value={selectedLocation}
                                        onChange={handleChange}
                                    >
                                        {locations.map((location, index) => (
                                            <option key={index} value={location}>
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                    <span className={cx('custom-arrow')}>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </span>
                                </div>
                            </div>

                            <div className={cx('line')}></div>

                            <div className={cx('wrapper_schedule')}>
                                <div className={cx('cinema_schedule')}>
                                    <h3 className={cx('cinema_name')}>Rap Ha Noi</h3>
                                    <div className={cx('showing')}>
                                        <div className={cx('showing-title')}>2D phụ đề</div>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('wrapper_schedule')}>
                                <div className={cx('cinema_schedule')}>
                                    <h3 className={cx('cinema_name')}>Rap Ha Noi</h3>
                                    <div className={cx('showing')}>
                                        <div className={cx('showing-title')}>2D phụ đề</div>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                        <button className={cx('showing_time')}>10:30</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
