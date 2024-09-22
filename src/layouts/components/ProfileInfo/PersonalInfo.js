import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PersonalInfo.module.scss';
import Button from '~/components/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import StarInfo from './StarInfo';

const cx = classNames.bind(styles);

function PersonalInfo() {
    const [focusStates, setFocusStates] = useState({
        email: false,
        password: false,
        fullname: false,
        phone: false,
        dateOfBirth: false,
    });
    const [gender, setGender] = useState('');

    const handleFocus = (inputName) => {
        setFocusStates((prev) => ({ ...prev, [inputName]: true }));
    };

    const handleBlur = (inputName) => {
        setFocusStates((prev) => ({ ...prev, [inputName]: false }));
    };

    //check radio
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

    // date of birth
    const [startDate, setStartDate] = useState(null); // State để lưu trữ ngày đã chọn

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
                            onFocus={() => handleFocus('fullname')}
                            onBlur={() => handleBlur('fullname')}
                        />
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
                    <label className={cx('label-res')}>Email</label>
                    <div className={cx('input', { focused: focusStates.email })}>
                        <input
                            className={cx('input-txt')}
                            type="text"
                            placeholder="Nhập email"
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
                    <label className={cx('label-res')} style={{ marginTop: '10px' }}>
                        Mật khẩu
                    </label>
                    <div className={cx('input', { focused: focusStates.password })}>
                        <input
                            className={cx('input-txt')}
                            type="password"
                            placeholder="Nhập mật khẩu"
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('login')}>
                <Button className={cx('login-btn')}>Cập nhật</Button>
            </div>
        </div>
    );
}

export default PersonalInfo;
