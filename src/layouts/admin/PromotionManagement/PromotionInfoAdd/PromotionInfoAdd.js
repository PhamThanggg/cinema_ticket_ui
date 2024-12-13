import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './PromotionInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CreateGenreApi, GenreDetailApi, UpdateGenreApi } from '~/service/GenreService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';
import { CreatePromotionInfoApi, UpdateImageProApi, UpdatePromotionInfoApi } from '~/service/PromotionService';

const cx = classNames.bind(styles);

function PromotionInfoAdd({ open, handleClose, promotion, ...props }) {
    const { state } = useAuth();
    const { token } = state;
    const [selectedImages, setSelectedImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        start: '',
        end: '',
        des: '',
    });

    useEffect(() => {
        if (promotion) {
            setFormData({
                name: promotion.name,
                start: promotion.startDate,
                end: promotion.endDate,
                des: promotion.description,
            });
        } else {
            setFormData({
                name: '',
                start: '',
                end: '',
                des: '',
            });
        }
    }, [promotion]);

    const validate = () => {
        if (!formData.name.trim()) {
            return 'Tên thể loại là bắt buộc.';
        }
        if (!formData.start) {
            return 'Ngày bắt đầu là bắt buộc.';
        }
        if (!formData.end) {
            return 'Ngày kết thúc là bắt buộc.';
        }
        if (!formData.des) {
            return 'Mô tả là bắt buộc.';
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
            description: formData.des,
            promotionType: 'INFO',
            startDate: formData.start,
            endDate: formData.end,
        };

        if (promotion) {
            const updated = await UpdatePromotionInfoApi(data, promotion.id, token);
            if (updated) {
                props.setLoadList((prev) => !prev);
                toast.success('Cập nhật thành công');
            }
        } else {
            const res = await CreatePromotionInfoApi(data, token);
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);

        // Tạo preview cho tất cả ảnh đã chọn
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setPreview(imagePreviews);
    };

    const handleUpload = async () => {
        if (selectedImages.length === 0) {
            toast.warning('Bạn chưa chọn ảnh nào.');
            return;
        }

        if (selectedImages.length > 1) {
            toast.warning('Bạn chỉ được chọn 1 ảnh.');
            return;
        }

        setUploading(true);
        const formData = new FormData();

        // Thêm từng file vào FormData
        selectedImages.forEach((file, index) => {
            formData.append('files', file);
        });

        const res = await UpdateImageProApi(formData, promotion.id, token);
        if (res) {
            props.setPromotion(res.result);
            toast.success('Thêm ảnh thành công');
        }
        setUploading(false);
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
                        maxWidth: '600px',
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
                    <div className={cx('title')}>{!promotion ? 'Tạo khuyến mãi' : 'Sửa khuyến mãi'}</div>
                    <div className={cx('star_title_glb')}>
                        (dấu <span className={cx('star_css_glb')}>*</span> là trường bắt buộc)
                    </div>
                </div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Tên khuyến mãi <span className={cx('star_css_glb')}>*</span>
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
                            Ngày bắt đầu <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="date"
                                name="start"
                                value={formData.start}
                                onChange={handleChange}
                                placeholder="Nhập tên"
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Ngày kết thúc <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="date"
                                name="end"
                                value={formData.end}
                                onChange={handleChange}
                                placeholder="Nhập tên"
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')} htmlFor="description">
                            Mô tả: <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <textarea
                            id="des"
                            name="des"
                            value={formData.des}
                            onChange={handleChange}
                            className={cx('select')}
                        ></textarea>
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

                <div>
                    {promotion && (
                        <div>
                            <h3 className={cx('title_img')}>Thêm ảnh</h3>
                            <input
                                type="file"
                                accept="image/*"
                                multiple // Cho phép chọn nhiều ảnh
                                onChange={handleImageChange}
                            />
                        </div>
                    )}

                    <div style={{ display: 'flex' }}>
                        {promotion && promotion.imageUrl && preview.length > 0 && (
                            <div style={{ marginTop: '10px', marginRight: '40px' }}>
                                {preview.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        style={{ maxWidth: '200px', margin: '5px' }}
                                    />
                                ))}
                            </div>
                        )}

                        {promotion && promotion.imageUrl && (
                            <div style={{ marginTop: '10px' }}>
                                <img
                                    src={promotion.imageUrl}
                                    alt={`Preview`}
                                    style={{ maxWidth: '200px', margin: '5px' }}
                                />
                            </div>
                        )}
                    </div>
                    {promotion && (
                        <div>
                            <button onClick={handleUpload} className={cx('submit-button')} disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PromotionInfoAdd;
