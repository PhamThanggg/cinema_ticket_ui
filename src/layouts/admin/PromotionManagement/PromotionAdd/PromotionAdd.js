import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Promotion.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';
import { CreatePromotionApi, UpdatePromotionApi } from '~/service/PromotionService';

const cx = classNames.bind(styles);

function PromotionAdd({ open, handleClose, promotion, ...props }) {
    const { state } = useAuth();
    const { token } = state;
    const [formData, setFormData] = useState({
        name: '',
        type: 'PHAN_TRAM',
        discount: '',
        count: '',
        startTime: '',
        endTime: '',
        min: '',
        max: '',
        des: '',
    });

    useEffect(() => {
        if (promotion) {
            setFormData({
                name: promotion.name,
                type: promotion.discountType,
                discount: promotion.discount,
                count: promotion.count,
                startTime: promotion.startDate,
                endTime: promotion.endDate,
                min: promotion.min,
                max: promotion.max,
                des: promotion.description,
            });
        } else {
            setFormData({
                name: '',
                type: 'PHAN_TRAM',
                discount: null,
                count: null,
                startTime: '',
                endTime: '',
                min: null,
                max: null,
                des: '',
            });
        }
    }, [promotion]);

    const validate = () => {
        const discountValue = Number(formData.discount);
        if (!formData.name.trim()) {
            return 'Tên phim là bắt buộc.';
        }
        if (!formData.type.trim()) {
            return 'Loại giảm giá là bắt buộc.';
        }
        if (formData.type === 'PHAN_TRAM') {
            if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
                return 'Phần trăm giảm giá là bắt buộc và phải lớn hơn 0 nhỏ hơn 100.';
            }
        } else {
            if (isNaN(discountValue) || discountValue <= 0) {
                return 'Số tiền giảm giá là bắt buộc và phải lớn hơn 0.';
            }
        }
        if (!formData.count || Number(formData.count) <= 0) {
            return 'số lượng là bắt buộc và phải lớn hơn 0.';
        }
        if (!formData.startTime) {
            return 'Thời gian bắt đầu là bắt buộc.';
        }
        if (!formData.endTime) {
            return 'Ngày kết thúc là bắt buộc.';
        }

        if (formData.min) {
            if (Number(formData.min) < 0) {
                return 'Số tiền thanh toán tối thiểu không được âm';
            }
        }

        if (formData.max) {
            if (Number(formData.max) < 0) {
                return 'Số tiền thanh toán tối đa không được âm';
            }
        }

        if (new Date(formData.startTime) > new Date(formData.endTime)) {
            return 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc.';
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
            discountType: formData.type,
            discount: formData.discount,
            count: formData.count,
            startDate: formData.startTime,
            endDate: formData.endTime,
            min: formData.min,
            max: formData.max,
            description: formData.des,
            promotionType: 'CODE',
        };

        if (promotion) {
            const updatedGenre = await UpdatePromotionApi(data, promotion.id, token);
            if (updatedGenre) {
                props.setLoadList((prev) => !prev);
                toast.success('Cập nhật thành công');
            }
        } else {
            const res = await CreatePromotionApi(data, token);
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
            [name]: name === 'type' ? value : value,
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
                        maxWidth: '1000px',
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
                    <div className={cx('title')}>
                        {!promotion ? 'Tạo khuyến mãi (mã code)' : 'Sửa khuyến mãi (mã code)'}
                    </div>
                    <div className={cx('star_title_glb')}>
                        (dấu <span className={cx('star_css_glb')}>*</span> là trường bắt buộc)
                    </div>
                </div>
                <div className={cx('form-container')}>
                    <div className={cx('form-row')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="name_cinema">
                                Tên khuyến mãi (CODE): <span className={cx('star_css_glb')}>*</span>
                            </label>
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
                            <label htmlFor="status">
                                Loại giảm giá: <span className={cx('star_css_glb')}>*</span>
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className={cx('select')}
                            >
                                <option value="PHAN_TRAM">Phần trăm</option>
                                <option value="TIEN">Tiền</option>
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address">
                                {formData.type === 'PHAN_TRAM' ? 'Phần trăm giảm giá' : 'Số tiền giảm giá'}:{' '}
                                <span className={cx('star_css_glb')}>*</span>
                            </label>
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address">
                                Số lượng: <span className={cx('star_css_glb')}>*</span>
                            </label>
                            <input
                                type="number"
                                id="count"
                                name="count"
                                value={formData.count}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address">
                                Ngày bắt đầu: <span className={cx('star_css_glb')}>*</span>
                            </label>
                            <input
                                type="date"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address">
                                Ngày kết thúc: <span className={cx('star_css_glb')}>*</span>
                            </label>
                            <input
                                type="date"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address">Số tiền thanh toán tối thiểu:</label>
                            <input
                                type="number"
                                id="min"
                                name="min"
                                value={formData.min}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address">Số tiền thanh toán tối đa:</label>
                            <input
                                type="number"
                                id="max"
                                name="max"
                                value={formData.max}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                        </div>
                        <div className={cx('form-group', 'top')}>
                            <label htmlFor="description">Mô tả:</label>
                            <textarea
                                id="des"
                                name="des"
                                value={formData.des}
                                onChange={handleChange}
                                className={cx('select')}
                            ></textarea>
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

export default PromotionAdd;
