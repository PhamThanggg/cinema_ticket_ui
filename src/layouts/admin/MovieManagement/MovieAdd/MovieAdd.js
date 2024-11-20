import styles from './MovieAdd.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/router';
import { useLocation } from 'react-router-dom';
import Loading from '~/components/Loading';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';
import { GetMoviePeopleApi } from '~/service/PersionService';
import { formatToApiDateTime } from '~/utils/dateFormatter';
import { CreateMovieApi } from '~/service/MovieService';
import { GetGenreApi } from '~/service/GenreService';

const cx = classNames.bind(styles);
function MovieAdd() {
    const navigate = useNavigate();
    const location = useLocation();
    const { movieId } = location.state || {};
    const { state } = useAuth();
    const { token } = state;

    const [formData, setFormData] = useState({
        name: '',
        producer: '',
        duration: '',
        language: '',
        ageLimit: 16,
        trailer: '',
        nation: '',
        description: '',
        premiereDate: '',
        status: 1,
    });

    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [genre, setGenre] = useState([]);

    const [directorApi, setDirectorApi] = useState(null);
    const [actorApi, setActorApi] = useState(null);
    const [genreApi, setGenreApi] = useState(null);

    useEffect(() => {
        const getActor = async () => {
            const res = await GetMoviePeopleApi(null, 2, 0, 50);
            if (res && res.result) {
                setActorApi(res.result);
            }
        };

        const getDirectorApi = async () => {
            const res = await GetMoviePeopleApi(null, 1, 0, 50);
            if (res && res.result) {
                setDirectorApi(res.result);
            }
        };

        const getGenreApi = async () => {
            const res = await GetGenreApi();
            if (res && res.result) {
                setGenreApi(res.result);
            }
        };
        // const getcinemaId = async () => {
        //     if (cinemaId) {
        //         try {
        //             const res = await GetCinemaIdApi(cinemaId);
        //             if (res && res.result) {
        //                 setFormData({
        //                     name_cinema: res.result.name,
        //                     address: res.result.address,
        //                     area_id: res.result.areaId,
        //                     status: res.result.status,
        //                 });
        //             }
        //         } catch (error) {
        //             navigate(routes.CinemaManagement);
        //         }
        //     }
        // };

        getActor();
        getDirectorApi();
        getGenreApi();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'status' ? value : name === 'area_id' ? Number(value) : value,
        }));
    };

    const handleChangeSelects = (selected) => {
        setActors(selected);
    };

    const handleChangeGenre = (selected) => {
        setGenre(selected);
    };

    const handleChangeDirector = (selected) => {
        setDirectors(selected);
    };

    const validate = () => {
        if (!formData.name.trim()) {
            return 'Name movie is required.';
        }
        if (!formData.producer.trim()) {
            return 'Producer is required.';
        }
        if (!formData.duration || formData.duration <= 0) {
            return 'Duration is required and must be greater than 0.';
        }
        if (!formData.language.trim()) {
            return 'Language is required.';
        }
        if (formData.ageLimit === undefined || formData.ageLimit === null) {
            return 'Age limit must be selected.';
        }
        if (!formData.trailer.trim()) {
            return 'Trailer URL is required.';
        }
        if (!formData.nation.trim()) {
            return 'Nation is required.';
        }
        if (!formData.description.trim()) {
            return 'Description is required.';
        }
        if (!formData.premiereDate.trim()) {
            return 'Premiere date is required.';
        }
        if (formData.status === undefined || formData.status === null) {
            return 'Status must be selected.';
        }
        if (genre.length < 1) {
            return 'Genre must be selected.';
        }
        return null;
    };

    const handleCreateMovie = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }

        var genreIds = [];
        var moviePeopleIds = [];

        if (genre.length > 0) {
            genre.forEach((data) => genreIds.push(data.value));
        }

        if (actors.length > 0) {
            actors.forEach((data) => moviePeopleIds.push(data.value));
        }

        if (directors.length > 0) {
            directors.forEach((data) => moviePeopleIds.push(data.value));
        }

        const data = {
            name_movie: formData.name,
            producer: formData.producer,
            title_movie: '',
            duration: formData.duration,
            language: formData.duration,
            age_limit: formData.ageLimit,
            status: formData.status,
            description: formData.description,
            premiere_date: formatToApiDateTime(formData.premiereDate),
            genres: genreIds,
            movie_people: moviePeopleIds,
        };

        if (!movieId) {
            const res = await CreateMovieApi(data, token);
            if (res) {
                toast.success(res.message);
            }
        } else {
            toast.success('Cập nhật ok');
        }
    };

    const handleReturn = () => {
        navigate(routes.ListMovie);
    };

    if (!actorApi) {
        return <Loading />;
    }

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý phim / Danh sách phim / <span>{movieId ? 'Sửa phim' : 'Tạo phim'}</span>
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('ctn')}>
                    <div className={cx('btn')}>
                        <button className={cx('btn_ex')} onClick={handleReturn}>
                            <FontAwesomeIcon icon={faAngleLeft} className={cx('icon_btn')} />
                            Quay lại
                        </button>
                        {/* <button className={cx('btn_add')}>
                            <FontAwesomeIcon icon={faPlus} className={cx('icon_btn')} />
                            Tạo rạp chiếu
                        </button> */}
                    </div>
                    <div className={cx('list')}>
                        <button className={cx('btn_delete')}>
                            <FontAwesomeIcon icon={faTrash} className={cx('icon_btn')} />
                            Xóa phim
                        </button>
                    </div>
                </div>

                <div className={cx('form-container')}>
                    <div className={cx('form-row')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="name_cinema">Tên phim:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="address">Nhà sản xuất:</label>
                            <input
                                type="text"
                                id="producer"
                                name="producer"
                                value={formData.producer}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="address">Ngôn ngữ:</label>
                            <input
                                type="text"
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="address">Giới hạn tuổi:</label>
                            <input
                                type="number"
                                id="ageLimit"
                                name="ageLimit"
                                value={formData.ageLimit}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="address">Thời lượng phim: (nhập số phút)</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="address">Trailer:</label>
                            <input
                                type="text"
                                id="trailer"
                                name="trailer"
                                value={formData.trailer}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="address">Quốc gia:</label>
                            <input
                                type="text"
                                id="nation"
                                name="nation"
                                value={formData.nation}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="address">Ngày công chiếu:</label>
                            <input
                                type="datetime-local"
                                id="premiereDate"
                                name="premiereDate"
                                value={formData.premiereDate}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="status">Trạng thái:</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={cx('select')}
                            >
                                <option value="0">Sắp chiếu</option>
                                <option value="1">Đang chiếu</option>
                                <option value="2">Kết thúc chiếu</option>
                            </select>
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="status">Thể loại:</label>
                            <Select
                                id="genre"
                                name="genre"
                                options={
                                    genreApi &&
                                    genreApi.map((actor) => ({
                                        value: actor.id,
                                        label: actor.name,
                                    }))
                                }
                                isMulti
                                value={genre}
                                onChange={handleChangeGenre}
                                placeholder="Tìm kiếm và chọn..."
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="status">Đạo diễn:</label>
                            <Select
                                id="director"
                                name="director"
                                options={
                                    directorApi &&
                                    directorApi.map((data) => ({
                                        value: data.id,
                                        label: data.name,
                                    }))
                                }
                                isMulti
                                value={directors}
                                onChange={handleChangeDirector}
                                placeholder="Tìm kiếm và chọn..."
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="status">Diễn viên:</label>
                            <Select
                                id="actor"
                                name="actor"
                                options={
                                    actorApi &&
                                    actorApi.map((actor) => ({
                                        value: actor.id,
                                        label: actor.name,
                                    }))
                                }
                                isMulti
                                value={actors}
                                onChange={handleChangeSelects}
                                placeholder="Tìm kiếm và chọn..."
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group', 'top')}>
                        <label htmlFor="description">Mô tả:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={cx('select')}
                        ></textarea>
                    </div>
                    <button className={cx('submit-button')} onClick={handleCreateMovie}>
                        {movieId ? 'Lưu' : 'Thêm mới'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieAdd;
