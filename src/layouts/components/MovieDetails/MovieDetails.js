import classNames from 'classnames/bind';
import styles from './MovieDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { ClockIcon, ScheduleIcon, StarIcon } from '~/components/Icon';
import DateTime from '~/components/DateTime/DateTime';
import { GetAreaApi } from '~/service/AreaService';
import Loading from '~/components/Loading';
import { Autocomplete, TextField } from '@mui/material';
import { CinemaAreaApi, CinemaScheduleApi } from '~/service/CinemaApi';
import { faCirclePlay, faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/router';

const cx = classNames.bind(styles);

function MovieDetail({ movieData }) {
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(formatDate(today));
    const [showTrailer, setShowTrailer] = useState(false);
    const [area, setArea] = useState([]);
    const [cinema, setCinema] = useState([]);
    const [cinemSchedule, setCinemSchedule] = useState(null);
    const [selectArea, setSelectArea] = useState(null);
    const [selectCinema, setSelectCinema] = useState(null);

    const [areaLocal, setAreaLocal] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getArea = async () => {
            const res = await GetAreaApi();
            if (res && res.result) {
                setArea(res.result);
            }
        };

        setLoading(true);
        getArea();
        setLoading(false);
    }, []);

    useEffect(() => {
        const getRoom = async () => {
            if (selectArea) {
                const res = await CinemaAreaApi(selectArea.id);

                if (res && res.result) {
                    setCinema(res.result);
                }
            } else {
                setCinema([]);
            }
        };

        setLoading(true);
        getRoom();
        setLoading(false);
    }, [selectArea]);

    useEffect(() => {
        const getCinemaSchedule = async () => {
            const data = await CinemaScheduleApi(selectCinema?.id || null, movieData?.id || null, selectedDate);
            if (data && data.result) {
                setCinemSchedule(data.result);
            }
        };

        getCinemaSchedule();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCinema, selectedDate]);

    const handleSelectCinema = (event, cinema) => {
        setSelectCinema(cinema);
    };

    const handleSelectArea = (event, area) => {
        setSelectArea(area);
        if (area) {
            setAreaLocal({ id: area.id, name: area.areaName });
        } else {
            setAreaLocal(null);
        }
    };

    const handlePlayTrailer = () => {
        setShowTrailer(true);
    };

    const handleCloseTrailer = () => {
        setShowTrailer(false);
    };

    // set chọn schedule
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleSelectSchedule = (data) => {
        if (areaLocal) {
            localStorage.setItem('area', JSON.stringify(areaLocal));
        }

        localStorage.setItem('movie', JSON.stringify(movieData));
        localStorage.setItem('schedule', JSON.stringify(data));

        navigate('/Booking#bookingSeat');
    };

    if (loading) {
        return <Loading />;
    }

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

                        {/* <div style={{ height: '200px', marginTop: '20px' }}>Comment</div> */}
                    </div>

                    <div className={cx('right_ctn')}>
                        <div className={cx('schedule')}>
                            <h2 className={cx('show_title')}>Lịch chiếu</h2>
                            <div className={cx('show_date')}>
                                <DateTime count={4} onDateSelect={handleDateSelect} />
                            </div>
                            <div className={cx('select')}>
                                <Autocomplete
                                    id="searchable-dropdown"
                                    options={area}
                                    getOptionLabel={(option) => option.areaName || ''}
                                    value={selectArea}
                                    onChange={handleSelectArea}
                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={'Chọn khu vực'}
                                            variant="outlined"
                                            fullWidth
                                            InputLabelProps={{
                                                style: { fontSize: '13px', top: '-7px' },
                                            }}
                                            sx={{
                                                fontSize: '13px',
                                                width: '230px',
                                                height: '0.35em',
                                                marginRight: '10px',
                                            }}
                                        />
                                    )}
                                    sx={{
                                        width: '140px',
                                        height: '35px',
                                        marginRight: '10px',
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '13px',
                                            height: '35px',
                                        },
                                    }}
                                />

                                <Autocomplete
                                    id="searchable-dropdown"
                                    options={cinema}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={selectCinema}
                                    onChange={handleSelectCinema}
                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={'Chọn rạp'}
                                            variant="outlined"
                                            fullWidth
                                            InputLabelProps={{
                                                style: { fontSize: '13px', top: '-7px' },
                                            }}
                                            sx={{
                                                fontSize: '13px',
                                                width: '230px',
                                                height: '0.35em',
                                                marginRight: '10px',
                                            }}
                                        />
                                    )}
                                    sx={{
                                        width: '220px',
                                        height: '35px',
                                        marginRight: '10px',
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '13px',
                                            height: '35px',
                                        },
                                    }}
                                />
                            </div>

                            <div className={cx('line')}></div>

                            {cinemSchedule &&
                                cinemSchedule.map((data, index) => (
                                    <div key={data.cinemaId}>
                                        <div className={cx('cinema_schedule')}>
                                            <h3 className={cx('cinema_name')}>{data.cinemaName}</h3>
                                            <div className={cx('showing')}>
                                                {/* <div className={cx('showing-title')}>2D phụ đề</div> */}
                                                {data.schedules.map((schedule, scheduleIndex) => {
                                                    const scheduleTime = new Date(schedule.startTime).getTime();
                                                    const currentTime = Date.now();
                                                    if (scheduleTime < currentTime) {
                                                        return null;
                                                    }

                                                    const date = new Date(schedule.startTime);
                                                    const hours = date.getHours().toString().padStart(2, '0');
                                                    const minutes = date.getMinutes().toString().padStart(2, '0');
                                                    const formattedTime = `${hours}:${minutes}`;
                                                    return (
                                                        <button
                                                            key={scheduleIndex}
                                                            className={cx('showing_time')}
                                                            onClick={() =>
                                                                handleSelectSchedule({
                                                                    ScheduleId: schedule.id,
                                                                    startTime: schedule.startTime,
                                                                    roomId: schedule.cinemaRooms.id,
                                                                    roomName: schedule.cinemaRooms.name,
                                                                    cinemaId: schedule.cinemaRooms.cinema.id,
                                                                    cinemaName: schedule.cinemaRooms.cinema.name,
                                                                    cinemaAdress: schedule.cinemaRooms.cinema.address,
                                                                    price: schedule.price,
                                                                })
                                                            }
                                                        >
                                                            {formattedTime}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        {index + 1 < cinemSchedule.length && (
                                            <div className={cx('wrapper_schedule')}></div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
