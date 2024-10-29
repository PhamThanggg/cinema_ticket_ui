import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { LockIcon, GoogleIcon } from '~/components/Icon';
import classNames from 'classnames/bind';
import styles from './AuthDialog.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSpinner, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { RegisterApi } from '~/service/auth';

const cx = classNames.bind(styles);

function Register({ open, handleClose, handleLogin }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const [focusStates, setFocusStates] = useState({
        email: false,
        password: false,
        repassword: false,
        fullname: false,
        phone: false,
        dateOfBirth: false,
    });
    const [isShowSpinner, setIsShowSpinner] = useState(false);

    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [startDate, setStartDate] = useState(null);

    const handleFocus = (inputName) => {
        setFocusStates((prev) => ({ ...prev, [inputName]: true }));
    };

    const handleBlur = (inputName) => {
        setFocusStates((prev) => ({ ...prev, [inputName]: false }));
    };

    //check box
    const [checked, setChecked] = useState(false);

    const handleDivClick = () => {
        setChecked(!checked);
    };

    const handleMaleClick = () => {
        setGender('male');
    };

    const handleFemaleClick = () => {
        setGender('female');
    };

    //gender
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    //validate
    const handleSubmit = async () => {
        const validations = [
            { condition: !fullname, message: 'Vui lòng nhập họ tên' },
            {
                condition: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
                message: 'Vui lòng nhập email hợp lệ',
            },
            { condition: !phone || !/^\d{10}$/.test(phone), message: 'Vui lòng nhập số điện thoại hợp lệ' },
            { condition: !gender, message: 'Vui lòng chọn giới tính' },
            { condition: !startDate, message: 'Vui lòng chọn ngày sinh' },
            { condition: startDate && startDate >= new Date(), message: 'Ngày sinh phải nhỏ hơn ngày hiện tại' },
            { condition: !password, message: 'Vui lòng nhập mật khẩu' },
            { condition: password !== repassword, message: 'Mật khẩu nhập lại không khớp' },
            { condition: !checked, message: 'Bạn cần đồng ý với điều khoản dịch vụ' },
        ];

        for (const { condition, message } of validations) {
            if (condition) {
                toast.error(message);
                return;
            }
        }

        const formattedDate = startDate.toISOString().split('T')[0];

        const user = {
            full_name: fullname.trim(),
            gender: gender.trim(),
            phone: phone.trim(),
            date_of_birth: formattedDate.trim(),
            email: email.trim(),
            password: password.trim(),
            repassword: repassword.trim(),
            status: 0,
        };

        console.log(user);
        setIsShowSpinner(true);
        // Call API
        const res = await RegisterApi(user);
        if (res && res.message) {
            toast.success(res.message);
        }

        setIsShowSpinner(false);
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
                        top: '0%',
                        height: '100%',
                    },
                },
            }}
        >
            <DialogContent className={cx('ctn-item')}>
                <button className={cx('btn-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('form')}>
                    <div className={cx('wr-icon')}>
                        <div className={cx('icon-bd')}>
                            <LockIcon className={cx('icon')} />
                        </div>
                    </div>
                    <h2 className={cx('title')}>Đăng Ký</h2>
                    <div className={cx('gg')}>
                        <button className={cx('login-gg')}>
                            <GoogleIcon />
                            <span className={cx('txt-gg')}> Đăng Ký Với Google</span>
                        </button>
                    </div>
                    <div className={cx('line')}>
                        <span>or</span>
                    </div>

                    <div className={cx('ctn-input-res')}>
                        <label className={cx('label-res')}>Họ tên</label>
                        <div className={cx('input', { focused: focusStates.fullname })}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập họ và tên"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                onFocus={() => handleFocus('fullname')}
                                onBlur={() => handleBlur('fullname')}
                            />
                        </div>
                    </div>

                    <div className={cx('ctn-input-res')}>
                        <label className={cx('label-res')}>Email</label>
                        <div className={cx('input', { focused: focusStates.email })}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                            />
                        </div>
                    </div>

                    <div className={cx('ctn-input-res')}>
                        <label className={cx('label-res')}>Số điện thoại</label>
                        <div className={cx('input', { focused: focusStates.phone })}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onFocus={() => handleFocus('phone')}
                                onBlur={() => handleBlur('phone')}
                            />
                        </div>
                    </div>

                    <div className={cx('gender-selection')}>
                        <label className={cx('label-res')}>Giới tính</label>
                        <div className={cx('gender-options')}>
                            <div className={cx('gender-male')} onClick={handleMaleClick}>
                                <input
                                    type="radio"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={handleGenderChange}
                                />
                                <span className={cx('male')}>Nam</span>
                            </div>
                            <div className={cx('gender-female')} onClick={handleFemaleClick}>
                                <input
                                    type="radio"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={handleGenderChange}
                                />
                                <span className={cx('female')}>Nữ</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('ctn-input-res')}>
                        <label className={cx('label-res')}>Ngày sinh</label>
                        <div className={cx('input', { focused: focusStates.dateOfBirth })}>
                            <DatePicker
                                className={cx('input-txt-date')}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                onFocus={() => handleFocus('dateOfBirth')}
                                onBlur={() => handleBlur('dateOfBirth')}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Ngày/Tháng/Năm"
                                showYearDropdown // Hiển thị lựa chọn năm
                                scrollableYearDropdown // Cho phép cuộn năm
                                yearDropdownItemNumber={100} // Số lượng năm hiển thị trong dropdown
                            />
                        </div>
                    </div>

                    <div className={cx('ctn-input-res')}>
                        <label className={cx('label-res')}>Mật khẩu</label>
                        <div className={cx('input', { focused: focusStates.password })}>
                            <input
                                className={cx('input-txt')}
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                            />
                            <span className={cx('icon-eye')} onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                            </span>
                        </div>
                    </div>

                    <div className={cx('ctn-input-res')}>
                        <label className={cx('label-res')}>Nhập lại mật khẩu</label>
                        <div className={cx('input', { focused: focusStates.repassword })}>
                            <input
                                className={cx('input-txt')}
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={repassword}
                                onChange={(e) => setRepassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu"
                                onFocus={() => handleFocus('repassword')}
                                onBlur={() => handleBlur('repassword')}
                            />
                            <span className={cx('icon-eye')} onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                            </span>
                        </div>
                    </div>
                    <div className={cx('checkbox-res')}>
                        <div onClick={handleDivClick} className={cx('ctn-cb-res')}>
                            <div>
                                <input
                                    className={cx('input-cb')}
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                />
                            </div>
                            <span className={cx('txt-cbox')}>
                                Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.
                            </span>
                        </div>
                    </div>
                    <div className={cx('login')}>
                        <Button
                            onClick={handleSubmit}
                            rightIcon={
                                isShowSpinner && <FontAwesomeIcon className={cx('custom-spinner')} icon={faSpinner} />
                            }
                            disabled={!checked}
                            className={cx('login-btn')}
                        >
                            Đăng Ký
                        </Button>
                    </div>
                    <div className={cx('checkbox')}>
                        <div>
                            <span className={cx('txt-cb', 'check-out')}>Bạn đã có tài khoản?</span>
                        </div>
                        <Link className={cx('forgot-pas', 'check-out')} onClick={handleLogin}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Register;
