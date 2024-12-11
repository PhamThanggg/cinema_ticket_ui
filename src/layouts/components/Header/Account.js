import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/image';
import Typpy from '@tippyjs/react/headless';
import { useAuth } from '~/components/Context/AuthContext';
import { toast } from 'react-toastify';
import { LogoutApi } from '~/service/auth';
import { useState } from 'react';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Account({ offSet }) {
    const { state, logout } = useAuth();
    const { account } = state;

    const [visible, setVisible] = useState(false);
    const handleToggle = () => {
        setVisible(!visible);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await LogoutApi(token);
            }
            logout();
            toast.success('Đăng xuất thành công!');
        } finally {
            setVisible(false);
        }
    };

    return (
        <Typpy
            interactive={true}
            hideOnClick={false}
            delay={[0, 0]}
            offset={offSet ? [40, 0] : [0, 0]}
            touch={true}
            placement={'bottom-start'}
            onClickOutside={() => setVisible(false)}
            onShow={() => setVisible(true)}
            onHide={() => setVisible(false)}
            render={(attrs) => (
                <div className={cx('dropdown-menu')} tabIndex="-1" {...attrs}>
                    <ul className={cx('menu-list-respon')}>
                        <Link to={'/profile#personalInfo'}>
                            <li className={cx('menu-item')}>Tài khoản</li>
                        </Link>
                        <Link to={'/profile#ticketInfo'}>
                            <li className={cx('menu-item')}>Lịch Sử</li>
                        </Link>
                        <li className={cx('menu-item')} onClick={handleLogout}>
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            )}
        >
            <div className={cx('wrapper-avatar')} onClick={handleToggle}>
                <img className={cx('avatar')} src={account?.image || images.user} alt={'PhamHuyThang'} />
                <div className={cx('info')}>
                    <span className={cx('name')}>
                        <img className={cx('image-name')} src={images.name} alt="name" />
                        {account?.fullName || 'User'}
                    </span>
                    <span className={cx('username')}>
                        <img className={cx('image-gift')} src={images.gift} alt="name" />
                        <span style={{ marginLeft: '5px' }}>{account?.star} Stars</span>
                    </span>
                </div>
            </div>
        </Typpy>
    );
}

export default Account;
