import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PersonalInfo.module.scss';
import Button from '~/components/Button';
import 'react-datepicker/dist/react-datepicker.css';
import StarInfo from './StarInfo';
import { useAuth } from '~/components/Context/AuthContext';
import { toast } from 'react-toastify';
import { UpdateUserApi } from '~/service/UserAPI';
import ChangePassword from './ChangePassword';

const cx = classNames.bind(styles);

function PersonalInfo() {
    const { state } = useAuth();
    const { account } = state;

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [focusStates, setFocusStates] = useState({
        email: false,
        password: false,
        fullname: false,
        phone: false,
        dateOfBirth: false,
    });

    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        dateOfBirth: '',
    });
    const [gender, setGender] = useState('');

    useEffect(() => {
        if (account) {
            setFormData({
                fullname: account.fullName,
                phone: account.phone,
                dateOfBirth: account.dateOfBirth,
            });
            setGender(account.gender);
        }
    }, []);

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        if (validate()) {
            toast.warning(validate());
            return;
        }

        const data = {
            full_name: formData.fullname,
            gender: gender,
            phone: formData.phone,
            date_of_birth: formData.dateOfBirth,
        };
        const res = await UpdateUserApi(data, account.id, token);
        if (res && res.result) {
            toast.success('Cập nhật thành công');
        }
    };

    const handleFocus = (inputName) => {
        setFocusStates((prev) => ({ ...prev, [inputName]: true }));
    };

    const handleBlur = (inputName) => {
        setFocusStates((prev) => ({ ...prev, [inputName]: false }));
    };

    //check radio
    const handleMaleClick = () => {
        setGender('Nam');
    };

    const handleFemaleClick = () => {
        setGender('Nữ');
    };

    //gender

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    // date of birth
    const [startDate, setStartDate] = useState(null); // State để lưu trữ ngày đã chọn

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'status' ? value : name === 'area_id' ? Number(value) : value,
        }));
    };

    const validate = () => {
        const vietnamPhoneRegex = /^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/;

        if (!formData.fullname.trim()) {
            return 'Bạn chưa nhập họ tên.';
        } else if (formData.fullname.length < 3 || formData.fullname > 30) {
            return 'Tên phải nằm trong khoảng từ 3 đến 30 ký tự';
        }

        if (!formData.phone.trim()) {
            return 'Bạn chưa nhập số điện thoại';
        } else if (!vietnamPhoneRegex.test(formData.phone)) {
            return 'Số điện thoại không hợp lệ';
        }

        return null;
    };

    const handleOpenClick = () => {
        console.log('ok');
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div className={cx('form', 'wide')}>
            <div className={cx('start-info')}>
                <StarInfo />
            </div>
            <div className={cx('row')}>
                <div className={cx('ctn-input-res')}>
                    <label className={cx('label-res')}>Họ tên</label>
                    <div className={cx('input', { focused: focusStates.fullname })}>
                        <input
                            className={cx('input-txt')}
                            type="text"
                            placeholder="Nhập họ và tên"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            onFocus={() => handleFocus('fullname')}
                            onBlur={() => handleBlur('fullname')}
                        />
                    </div>
                </div>

                <div className={cx('ctn-input-res')}>
                    <label className={cx('label-res')}>Ngày sinh</label>
                    <div className={cx('input', { focused: focusStates.dateOfBirth })}>
                        <input
                            className={cx('input-txt', 'input_date')}
                            type="date"
                            placeholder="Nhập họ và tên"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={cx('ctn-input-res')}>
                    <label className={cx('label-res')}>Email</label>
                    <div className={cx('input', { focused: focusStates.email })}>
                        <input
                            disabled
                            className={cx('input-txt')}
                            type="text"
                            placeholder="Nhập email"
                            value={account?.email || ''}
                        />
                    </div>
                </div>

                <div className={cx('ctn-input-res')}>
                    <label className={cx('label-res')}>Số điện thoại</label>
                    <div className={cx('input', { focused: focusStates.phone })}>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={cx('input-txt')}
                            type="text"
                            placeholder="Nhập số điện thoại"
                            onFocus={() => handleFocus('phone')}
                            onBlur={() => handleBlur('phone')}
                        />
                    </div>
                </div>

                <div className={cx('ctn-input-res')}>
                    <label className={cx('label-res')}>Giới tính</label>
                    <div className={cx('gender-options')}>
                        <div className={cx('gender-male')} onClick={handleMaleClick}>
                            <input
                                name="gender"
                                type="radio"
                                value="Nam"
                                checked={gender === 'Nam' || account?.gender === 'Nam'}
                                onChange={handleGenderChange}
                            />
                            <span className={cx('male')}>Nam</span>
                        </div>
                        <div className={cx('gender-female')} onClick={handleFemaleClick}>
                            <input
                                name="gender"
                                type="radio"
                                value="Nữ"
                                checked={gender === 'Nữ' || account?.gender === 'Nữ'}
                                onChange={handleGenderChange}
                            />
                            <span className={cx('female')}>Nữ</span>
                        </div>
                    </div>
                </div>

                <div className={cx('ctn-input-res')}>
                    <label className={cx('label-res')} style={{ marginTop: '10px' }}>
                        Mật khẩu
                    </label>
                    <div className={cx('input')}>
                        <input
                            className={cx('input-txt')}
                            type="password"
                            placeholder="Nhập mật khẩu"
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                        />
                        <span onClick={handleOpenClick}>Đổi mật khẩu</span>
                    </div>
                </div>
            </div>
            <div className={cx('login')}>
                <Button className={cx('login-btn')} onClick={handleUpdate}>
                    Cập nhật
                </Button>
            </div>

            <ChangePassword open={isDialogOpen} handleClose={handleCloseDialog} />
        </div>
    );
}

export default PersonalInfo;
