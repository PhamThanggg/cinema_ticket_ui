import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Area.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';
import { CreateAreaApi, UpdateAreaApi } from '~/service/AreaService';

const cx = classNames.bind(styles);

function AreaAdd({ open, handleClose, area, ...props }) {
    const { state } = useAuth();
    const { token } = state;
    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        const getGenre = async () => {
            if (area) {
                setFormData({
                    name: area.areaName,
                });
            } else {
                setFormData({
                    name: '',
                });
            }
        };

        getGenre();
    }, [area]);

    const validate = () => {
        if (!formData.name.trim()) {
            return 'Tên khu vực là bắt buộc.';
        }

        return null;
    };

    const handleAddClick = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }

        const data = {
            area_name: formData.name,
        };

        if (area) {
            const updatedArea = await UpdateAreaApi(data, area.id, token);
            if (updatedArea) {
                props.setLoadList((prev) => !prev);
                toast.success('Cập nhật thành công');
            }
        } else {
            const res = await CreateAreaApi(data, token);
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
                    <div className={cx('title')}>{!area ? 'Tạo khu vực' : 'Sửa khu vực'}</div>
                    <div className={cx('star_title_glb')}>
                        (dấu <span className={cx('star_css_glb')}>*</span> là trường bắt buộc)
                    </div>
                </div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Tên khu vực <span className={cx('star_css_glb')}>*</span>
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

export default AreaAdd;
