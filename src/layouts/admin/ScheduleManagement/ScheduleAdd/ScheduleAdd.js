import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ScheduleAdd.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { MovieShowNowAllApi } from '~/service/MovieService';
import { toast } from 'react-toastify';
import { formatDateTime, formatToApiTime } from '~/utils/dateFormatter';
import { CreateScheduleApi, GetcheduleIdApi, UpdateScheduleApi } from '~/service/ScheduleApi';
import { useAuth } from '~/components/Context/AuthContext';

const cx = classNames.bind(styles);

function GenreAdd({ open, handleClose, roomId, schedule, scheduleId, setSchedule }) {
    const { state } = useAuth();
    const { token } = state;
    const [movies, setMovies] = useState(null);
    const [movie, setMovie] = useState([]);

    const [formData, setFormData] = useState({
        roomId: null,
        date: '',
        startTime: '',
        endTime: '',
        price: '',
    });

    useEffect(() => {
        getMovie();
    }, []);

    useEffect(() => {
        getScheduleId();
    }, [scheduleId]);

    const getMovie = async () => {
        const res = await MovieShowNowAllApi();
        if (res) {
            setMovies(res.result);
        }
    };

    const getScheduleId = async () => {
        if (scheduleId) {
            const res = await GetcheduleIdApi(scheduleId);
            if (res) {
                setFormData({
                    roomId: res.result.cinemaRooms.id,
                    date: res.result.screeningDate,
                    startTime: formatToApiTime(res.result.startTime),
                    endTime: formatToApiTime(res.result.endTime),
                    price: res.result.price,
                });

                setMovie({ value: res.result.movies.id, label: res.result.movies.nameMovie });
            }
        }
    };

    const handleChangeSelects = (selected) => {
        setMovie(selected);
    };
    const validate = () => {
        if (!roomId) {
            return 'Room must be selected.';
        }
        if (!movie.value) {
            return 'Movie must be selected.';
        }
        if (!formData.date) {
            return 'Date is required.';
        }
        if (!formData.startTime) {
            return 'Start time is required.';
        }
        if (!formData.endTime) {
            return 'End time is required.';
        }
        if (formData.startTime >= formData.endTime) {
            return 'Start time must be earlier than end time.';
        }
        if (!formData.price) {
            return 'Price is required.';
        } else if (Number(formData.price) <= 0) {
            return 'Price must be greater than 0.';
        }
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'movie' ? value : name === 'area_id' ? Number(value) : value,
        }));
    };

    const handleSubmit = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }

        const data = {
            id_cinema_room: roomId,
            id_movie: movie.value,
            screening_date: formData.date,
            start_time: formatDateTime(formData.date, formData.startTime),
            end_time: formatDateTime(formData.date, formData.endTime),
            status: 1,
            price: formData.price,
        };

        if (scheduleId) {
            const updatedGenre = await UpdateScheduleApi(data, scheduleId, token);
            if (updatedGenre) {
                toast.success('Update successfully');
                // setSchedule((prevList) =>
                //     prevList.map((genre) => (genre.id === updatedGenre.result.id ? updatedGenre.result : genre)),
                // );
            }
        } else {
            const res = await CreateScheduleApi(data, token);
            if (res && res.result) {
                toast.success(res.message);
                // if (schedule) {
                //     setSchedule((prevList) => [res.result, ...prevList]);
                // }
            }
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className={cx('wrapper')}
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        width: '100%',
                        maxWidth: '400px',
                        top: '-10%',
                        minHeight: '450px',
                    },
                },
            }}
        >
            <DialogContent className={cx('ctn-item')}>
                <button className={cx('btn-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('title')}>{scheduleId ? 'Sửa suất chiếu' : 'Tạo suất chiếu'}</div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label htmlFor="status" className={cx('label')}>
                            Chọn phim:
                        </label>
                        <Select
                            id="movie"
                            name="movie"
                            options={
                                movies &&
                                movies.map((data) => ({
                                    value: data.id,
                                    label: data.nameMovie,
                                }))
                            }
                            value={movie}
                            onChange={handleChangeSelects}
                            placeholder="Tìm kiếm và chọn..."
                            className="react-select-container"
                            classNamePrefix="react-select"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    fontSize: '14px',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    fontSize: '14px',
                                }),
                                option: (base) => ({
                                    ...base,
                                    fontSize: '14px',
                                }),
                            }}
                        />
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn ngày</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="date"
                                placeholder="Nhập tên"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn thời gian bắt đầu</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="time"
                                placeholder="Nhập tên"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn thời gian kết thúc</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="time"
                                placeholder="Nhập tên"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Nhập giá vé</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="number"
                                placeholder="Nhập giá vé"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('btn_center')}>
                    <button className={cx('btn_close')} onClick={handleClose}>
                        Hủy
                    </button>

                    <button className={cx('btn_save')} onClick={handleSubmit}>
                        Lưu
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default GenreAdd;
