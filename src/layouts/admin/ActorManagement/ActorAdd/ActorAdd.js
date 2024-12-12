import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './GenreAdd.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CreateGenreApi, GenreDetailApi, UpdateGenreApi } from '~/service/GenreService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';

const cx = classNames.bind(styles);

function ActorAdd({ open, handleClose, setGenreList, genreId, ...props }) {
    const { state } = useAuth();
    const { token } = state;
    const [formData, setFormData] = useState({
        name: '',
        status: 1,
    });

    useEffect(() => {
        const getGenre = async () => {
            if (genreId) {
                const res = await GenreDetailApi(genreId);

                if (res) {
                    setFormData({
                        name: res.result.name,
                        status: res.result.status,
                    });
                }
            } else {
                setFormData({
                    name: '',
                    status: 1,
                });
            }
        };

        getGenre();
    }, [genreId]);

    const validate = () => {
        if (!formData.name.trim()) {
            return 'Tên thể loại là bắt buộc.';
        }
        if (formData.status === undefined || formData.status === null) {
            return 'Trạng thái là bắt buộc.';
        }

        return null;
    };

    const handleAddClick = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }

        const data = {
            name: formData.name,
            status: formData.status,
        };

        if (genreId) {
            const updatedGenre = await UpdateGenreApi(data, genreId, token);
            setGenreList((prevList) =>
                prevList.map((genre) => (genre.id === updatedGenre.result.id ? updatedGenre.result : genre)),
            );
            toast.success('Cập nhật thành công');
        } else {
            const res = await CreateGenreApi(data, token);
            if (res) {
                props.setLoadList((prev) => !prev);
                toast.success(res.message);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'status' ? value : name === 'area_id' ? Number(value) : value,
        }));
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
                        minHeight: '250px',
                    },
                },
            }}
        >
            <DialogContent className={cx('ctn-item')}>
                <button className={cx('btn-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('title_ctn_glb')}>
                    <div className={cx('title')}>{!genreId ? 'Tạo thể loại' : 'Sửa thể loại'}</div>
                    <div className={cx('star_title_glb')}>
                        (dấu <span className={cx('star_css_glb')}>*</span> là trường bắt buộc)
                    </div>
                </div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Tên thể loại <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập tên"
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Chọn trạng thái: <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <select
                            className={cx('input', 'select')}
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="1">Hoạt động</option>
                            <option value="2">Không hoạt động</option>
                        </select>
                    </div>
                </div>

                <div className={cx('btn_center')}>
                    <button className={cx('btn_close')} onClick={handleClose}>
                        Hủy
                    </button>

                    <button className={cx('btn_save')} onClick={handleAddClick}>
                        Lưu
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ActorAdd;
