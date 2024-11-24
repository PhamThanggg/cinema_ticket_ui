import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ComboAdd.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { CreateItemApi, GetItemByIdApi, UpdateItemApi } from '~/service/ItemService';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';

const cx = classNames.bind(styles);

function GenreAdd({ open, handleClose, comboId, cinemaId }) {
    const { state } = useAuth();
    const { token } = state;
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        price: '',
        description: '',
        status: 1,
    });

    useEffect(() => {
        getItemById();
    }, [comboId]);

    const getItemById = async () => {
        if (comboId) {
            const res = await GetItemByIdApi(comboId);
            if (res) {
                setFormData({
                    name: res.result.name,
                    imageUrl: res.result.imageUrl,
                    price: res.result.price,
                    description: res.result.description,
                    status: res.result.status,
                });
            }
        }
    };

    const validate = () => {
        if (!cinemaId) {
            return 'Cinema not found.';
        }
        if (!formData.name) {
            return 'name is required.';
        }
        if (!formData.imageUrl) {
            return 'imageUrl is required.';
        }
        if (!formData.price) {
            return 'Price is required.';
        }
        if (!formData.description) {
            return 'Description is required.';
        }
        if (formData.status === undefined || formData.status === null) {
            return 'Status must be selected.';
        }
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'status' ? Number(value) : value,
        }));
    };

    const handleSubmit = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }

        const data = {
            id_cinema: cinemaId,
            item_name: formData.name,
            image_url: formData.imageUrl,
            item_description: formData.description,
            item_price: formData.price,
        };

        if (comboId) {
            const updatedGenre = await UpdateItemApi(data, comboId, token);
            if (updatedGenre) {
                toast.success('Update successfully');
                // setSchedule((prevList) =>
                //     prevList.map((genre) => (genre.id === updatedGenre.result.id ? updatedGenre.result : genre)),
                // );
            }
        } else {
            const res = await CreateItemApi(data, token);
            if (res) {
                toast.success(res.message);
            }
            // if (res && res.result) {
            //     if (schedule) {
            //         setSchedule((prevList) => [res.result, ...prevList]);
            //     }
            // }
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
                        minHeight: '250px',
                    },
                },
            }}
        >
            <DialogContent className={cx('ctn-item')}>
                <button className={cx('btn-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('title')}>{comboId ? 'Sửa combo' : 'Tạo combo'}</div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Tên combo</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập tên"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Đường dẫn ảnh</label>
                        <div className={cx('input')}>
                            <input
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập đường dẫn ảnh"
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Nhập giá</label>
                        <div className={cx('input')}>
                            <input
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={cx('input-txt')}
                                type="number"
                                placeholder="Nhập giá"
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Nhập mô tả</label>
                        <div className={cx('input')}>
                            <input
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập mô tả"
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn trạng thái:</label>
                        <select className={cx('input', 'select')}>
                            <option value="1">Đang bán</option>
                            <option value="2">Ngừng bán</option>
                        </select>
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
