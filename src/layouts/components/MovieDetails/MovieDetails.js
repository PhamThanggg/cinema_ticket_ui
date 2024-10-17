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

function MovieDetail({ movieData, areaData }) {
    const [showTrailer, setShowTrailer] = useState(false);
    const handlePlayTrailer = () => {
        setShowTrailer(true);
    };

    const handleCloseTrailer = () => {
        setShowTrailer(false);
    };

    // begin select option arae and cimema
    const [selectedLocation, setSelectedLocation] = useState('Toàn quốc');

    const handleChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const [selectedCinema, setSelectedCinema] = useState('All Rạp');

    const handleChangeCinema = (event) => {
        setSelectedCinema(event.target.value);
    };

    const locations = [{ id: 0, areaName: 'Toàn quốc' }, ...areaData];

    const cinemas = [
        'All Rạp',
        'TP Hồ Chí Minh',
        'Nghệ An',
        'Thừa Thiên Huế',
        'An Giang',
        'Bà Rịa - Vũng Tàu',
        'Hải Phòng',
        'Đà Nẵng',
        'Khánh Hòa',
    ];
    // end select option arae and cimema

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    // set chọn schedule
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(formatDate(today));

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    console.log('Selected Date:', selectedDate);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('trailer')} onClick={handlePlayTrailer}>
                <div className={cx('overlay', 'left')}></div>
                <img
                    className={cx('trailer_img')}
                    src={
                        movieData.images[0] !== undefined
                            ? movieData.images[0].imageUrl
                            : 'https://www.galaxycine.vn/_next/static/media/not_found.f844bf41.jpg'
                    }
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
                            src={movieData.trailer}
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
                                src={
                                    movieData.images[0] !== undefined
                                        ? movieData.images[0].imageUrl
                                        : 'https://www.galaxycine.vn/_next/static/media/not_found.f844bf41.jpg'
                                }
                                alt=""
                            />
                            <div className={cx('content_ctn')}>
                                <div style={{ display: 'flex' }}>
                                    <h2 className={cx('movie_name')}>{movieData.nameMovie}</h2>
                                    <div className={cx('age')}>T{movieData.ageLimit}</div>
                                </div>
                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                    <p className={cx('time')}>
                                        <ClockIcon /> <span>{movieData.duration} phút</span>
                                    </p>
                                    <p className={cx('date')}>
                                        <ScheduleIcon />
                                        <span> {formatDate(movieData.premiereDate)}</span>
                                    </p>
                                </div>
                                <div className={cx('votes')}>
                                    <StarIcon className={cx('star')} /> <p>4.5</p> <span>(199 votes)</span>
                                </div>
                                <div className={cx('country')}>
                                    Quốc gia: <span>{movieData.nation}</span>
                                </div>
                                <div className={cx('director')}>
                                    Nhà sản xuất: <span>{movieData.producer}</span>
                                </div>
                                <div className={cx('genre')}>
                                    Thể loại:
                                    {movieData.genres.map((genre, index) => (
                                        <span key={genre.id}>
                                            {genre.name}
                                            {index < movieData.genres.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div>
                                <div className={cx('genre')}>
                                    Đạo diễn:
                                    <span>Thang pham</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('movie-nd')}>Nội dung phim</div>
                        <p className={cx('nd')}>{movieData.description}</p>

                        <div style={{ height: '200px', marginTop: '20px' }}>Comment</div>
                    </div>

                    <div className={cx('right_ctn')}>
                        <div className={cx('schedule')}>
                            <h2 className={cx('show_title')}>Lịch chiếu</h2>
                            <div className={cx('show_date')}>
                                <DateTime count={4} onDateSelect={handleDateSelect} />
                            </div>
                            <div className={cx('select')}>
                                <div className={cx('show_area')}>
                                    <select
                                        className={cx('location-select')}
                                        value={selectedLocation}
                                        onChange={handleChange}
                                    >
                                        {locations.map((location, index) => (
                                            <option key={location.id} value={location.areaName}>
                                                {location.areaName}
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
                                        value={selectedCinema}
                                        onChange={handleChangeCinema}
                                    >
                                        {cinemas.map((location, index) => (
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
