import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';
import { UpdatePasswordApi } from '~/service/UserAPI';

const cx = classNames.bind(styles);

function ChangePassword({ open, handleClose }) {
    const { state } = useAuth();
    const { token } = state;
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        reNewPassword: '',
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const validate = () => {
        if (!formData.password.trim()) {
            return 'Vui lòng nhập mật khẩu cũ.';
        }
        if (!formData.newPassword.trim()) {
            return 'Vui lòng nhập mật khẩu mới.';
        }
        if (!formData.reNewPassword.trim()) {
            return 'Vui lòng nhập mật lại mật khẩu mới.';
        }

        return null;
    };

    const handleAddClick = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }

        const data = {
            password: formData.password,
            newPassword: formData.newPassword,
            reNewPassword: formData.reNewPassword,
        };

        const res = await UpdatePasswordApi(data, token);
        if (res) {
            toast.success('Đổi mật khẩu thành công');
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
                <div className={cx('title')}>Đổi mật khẩu</div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Mật khẩu cũ</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu cũ"
                            />
                            <span className={cx('icon-eye')} onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                            </span>
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Mật khẩu mới</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu mới"
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Nhập lại mật khẩu mới</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="reNewPassword"
                                value={formData.reNewPassword}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu mới"
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('btn_center')}>
                    <button className={cx('btn_close')} onClick={handleClose}>
                        Hủy
                    </button>

                    <button className={cx('btn_save')} onClick={handleAddClick}>
                        Lưu thay đổi
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ChangePassword;
