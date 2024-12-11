import classNames from 'classnames/bind';
import styles from './MovieCinemaTime.module.scss';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import MovieBooking from './MovieBooking';
import DateSlider from '../../../../components/DateTime/DateTime';
import { MovieAreaShowNowApi } from '~/service/MovieService';
import { CinemaAreaApi, CinemaScheduleApi } from '~/service/CinemaApi';
import { Autocomplete, TextField } from '@mui/material';

const cx = classNames.bind(styles);

function MovieCinemaTime({ dataArea, setAreaData, setMovieData, setScheduleData }) {
    const today = new Date();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(formatDate(today));
    const [isVisible, setIsVisible] = useState('place');
    const [selectMovie, setselectMovie] = useState(null);
    const [activeArea, setActiveArea] = useState(null);
    const [movie, setMovie] = useState(null);
    const [cinema, setCinema] = useState(null);
    const [selectCinema, setSelectCinema] = useState(null);
    const [cinemSchedule, setCinemSchedule] = useState(null);
    const [selectSchedule, setSelectSchedule] = useState(null);

    //quản lý movie chọn
    const [selectedIndex, setSelectedIndex] = useState(null);

    console.log(cinemSchedule);
    useEffect(() => {
        if (activeArea) {
            getCinema();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeArea]);

    useEffect(() => {
        if (activeArea) {
            getMovie();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeArea]);

    useEffect(() => {
        if (selectMovie) {
            getCinemaSchedule();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectMovie, selectCinema, selectedDate]);

    const handleClick = (areaId, areaName) => {
        setActiveArea({ id: areaId, name: areaName });
        setAreaData({ id: areaId, name: areaName });

        setMovieData(null);
        setCinemSchedule(null);
        setselectMovie(null);
        setMovieData(null);
        setScheduleData(null);
        setSelectedIndex(null);
        setSelectSchedule(null);
    };

    const handleSelectMovie = (index, movie) => {
        setSelectedIndex(index);
        setselectMovie(movie);

        setMovieData(movie);
        setCinemSchedule(null);
        setSelectSchedule(null);
    };

    const handleSelectCinema = (event, cinema) => {
        setSelectCinema(cinema);
    };

    const handleSelectSchedule = (data) => {
        setSelectSchedule(data);
        setScheduleData(data);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const getCinema = async () => {
        const res = await CinemaAreaApi(activeArea.id);

        if (res && res.result) {
            setCinema(res.result);
        }
    };

    const getMovie = async () => {
        const data = await MovieAreaShowNowApi(activeArea.id, 0, 0, 100);

        if (data && data.result) {
            setMovie(data.result);
        }
    };

    const getCinemaSchedule = async () => {
        const data = await CinemaScheduleApi(selectCinema?.id || null, selectMovie?.id || null, selectedDate);
        if (data && data.result) {
            setCinemSchedule(data.result);
        }
    };

    // logic giao diện
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
    }, [isVisible, cinemSchedule]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('order-ctn')}>
                <div className={cx('order-place')} onClick={() => toggleDownUp('place')}>
                    <h3 className={cx('title-place')}>Chọn vị trí {activeArea ? ' - ' + activeArea.name : ''}</h3>
                    <div className={cx('btn-hide', { hidden: isVisible !== 'place' })}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCaretUp} />
                    </div>
                    <div className={cx('btn-show', { hidden: isVisible === 'place' })}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
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
                    {dataArea.map((data, index) => (
                        <button
                            className={cx('place', { active: activeArea && activeArea.id === data.id })}
                            key={data.id}
                            onClick={() => handleClick(data.id, data.areaName)}
                        >
                            {data.areaName}
                        </button>
                    ))}
                </div>
            </div>

            <div className={cx('order-ctn')}>
                <div className={cx('order-place')} onClick={() => toggleDownUp('movie')}>
                    <h3 className={cx('title-place')}>Chọn phim {selectMovie ? ' - ' + selectMovie.nameMovie : ''}</h3>
                    <div className={cx('btn-hide', { hidden: isVisible !== 'movie' })}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCaretUp} />
                    </div>
                    <div className={cx('btn-show', { hidden: isVisible === 'movie' })}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
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
                    <MovieBooking
                        movieData={movie}
                        handleSelectMovie={handleSelectMovie}
                        selectedIndex={selectedIndex}
                    />
                    <div style={{ height: '10px' }}></div>
                </div>
            </div>

            <div className={cx('order-ctn')}>
                <div className={cx('order-place')} onClick={() => toggleDownUp('time')}>
                    <h3 className={cx('title-place')}>Chọn suất</h3>
                    <div className={cx('btn-hide', { hidden: isVisible !== 'time' })}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCaretUp} />
                    </div>
                    <div className={cx('btn-show', { hidden: isVisible === 'time' })}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
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
                                            width: '250px',
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
                        </div>
                        <div className={cx('booking-date')}>
                            <DateSlider onDateSelect={handleDateSelect} />
                        </div>

                        {cinemSchedule &&
                            cinemSchedule.map((data) => (
                                <div key={data.cinemaId} className={cx('cinema-schedule')}>
                                    <div className={cx('cinema-name')}>
                                        <div className={cx('name-detail')}>
                                            {data.cinemaName}
                                            {/* <span className={cx('name-pd')}>{schedule.type}</span> */}
                                        </div>
                                    </div>
                                    <div className={cx('hour')}>
                                        {data.schedules.map((schedule, scheduleIndex) => {
                                            const date = new Date(schedule.startTime);
                                            const hours = date.getHours().toString().padStart(2, '0');
                                            const minutes = date.getMinutes().toString().padStart(2, '0');
                                            const formattedTime = `${hours}:${minutes}`;
                                            return (
                                                <button
                                                    key={scheduleIndex}
                                                    className={cx('btn-hour', {
                                                        active: selectSchedule?.ScheduleId === schedule?.id,
                                                    })}
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
                            ))}

                        {cinemSchedule && cinemSchedule.length < 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                Không có suất chiếu nào
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCinemaTime;
