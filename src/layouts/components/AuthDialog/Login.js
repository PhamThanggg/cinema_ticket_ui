import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { LockIcon, GoogleIcon } from '~/components/Icon';
import classNames from 'classnames/bind';
import styles from './AuthDialog.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSpinner, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { LoginApi } from '~/service/auth';
import { useAuth } from '~/components/Context/AuthContext';

import { useLocation } from 'react-router-dom';
import { LoginGGApi } from '~/service/auth';

const cx = classNames.bind(styles);

function Login({ open, handleClose, handleRegister, handleLoginDialog }) {
    const { login, state } = useAuth();
    const [focusStates, setFocusStates] = useState({
        email: false,
        password: false,
    });

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

    //an hien pas
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    //Logic API
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleLogin = async () => {
        setIsShowPassword(true);

        if (!email || !password) {
            toast.error('Email/Password is required');
            setIsShowPassword(false);
            return;
        }

        const res = await LoginApi(email, password);
        if (res && res.result.token) {
            login(res.result);
            toast.success('Đăng nhập thành công!');
            handleClose();
        }

        setIsShowPassword(false);
    };

    // login gg
    const handleClick = () => {
        const callbackUrl = 'http://localhost:3000';
        const authUrl = 'https://accounts.google.com/o/oauth2/auth';
        const googleClientId = '296253261995-l9h9uurvmsmb31l9lenrv3iau6p1c6lj.apps.googleusercontent.com';

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl,
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&prompt=select_account`;

        window.location.href = targetUrl;
    };

    const location = useLocation();

    useEffect(() => {
        const handleLogin = async () => {
            const code = getCodeFromUrl();
            if (!state.isAuthenticated && code) {
                handleLoginDialog();
                const res = await LoginGGApi(decodeURIComponent(code));

                if (res && res.result.token) {
                    await login(res.result);
                    toast.success('Đăng nhập thành công!');
                    handleClose();
                }
            }
        };
        setIsShowPassword(true);

        handleLogin();

        setIsShowPassword(false);
    }, []);

    const getCodeFromUrl = () => {
        const queryString = location.search;
        const start = queryString.indexOf('code=');

        if (start !== -1) {
            const codeString = queryString.substring(start + 5);

            return codeString.substring(0);
        }

        return null;
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
                        minHeight: '520px',
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
                    <h2 className={cx('title')}>Đăng Nhập</h2>
                    <div className={cx('gg')}>
                        <button className={cx('login-gg')} onClick={handleClick}>
                            <GoogleIcon />
                            <span className={cx('txt-gg')}> Đăng Nhập Với Google</span>
                        </button>
                    </div>
                    <div className={cx('line')}>
                        <span>or</span>
                    </div>

                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Email</label>
                        <div className={cx('input', { focused: focusStates.email })}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                            />
                        </div>
                    </div>

                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Mật khẩu</label>
                        <div className={cx('input', { focused: focusStates.password })}>
                            <input
                                className={cx('input-txt')}
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                            />

                            <span className={cx('icon-eye')} onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                            </span>
                        </div>
                    </div>
                    <div className={cx('checkbox')}>
                        <div onClick={handleDivClick} className={cx('ctn-cb')}>
                            <input
                                className={cx('input-cb')}
                                type="checkbox"
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                            />
                            <span className={cx('txt-cb')}>Lưu lại thông tin</span>
                        </div>
                        <Link className={cx('forgot-pas')}>Quên mật khẩu</Link>
                    </div>
                    <div className={cx('login')}>
                        <button onClick={() => handleLogin()} className={cx('login-btn')}>
                            Đăng Nhập
                            {isShowPassword && <FontAwesomeIcon className={cx('custom-spinner')} icon={faSpinner} />}
                        </button>
                    </div>
                    <div className={cx('checkbox')}>
                        <div>
                            <span className={cx('txt-cb', 'check-out')}>Bạn chưa có tài khoản?</span>
                        </div>
                        <Link className={cx('forgot-pas', 'check-out')} onClick={handleRegister}>
                            Đăng ký ngay
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Login;
