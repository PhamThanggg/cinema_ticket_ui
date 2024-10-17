import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/image';
import Typpy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { useAuth } from '~/components/Context/AuthContext';
import { toast } from 'react-toastify';
import { LogoutApi } from '~/service/auth';
import { getMyInfoApi } from '~/service/UserAPI';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Account(offSet) {
    const { logout } = useAuth();
    const [account, setAccount] = useState(null);

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

    // call api
    useEffect(() => {
        getMyInfo();
    }, []);

    const getMyInfo = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const getAcc = await getMyInfoApi(token);

                setAccount(getAcc);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
    };

    if (!account) {
        return <Loading />;
    }
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
                        <li className={cx('menu-item')}>Tài khoản</li>
                        <li className={cx('menu-item')}>Lịch Sử</li>
                        <li className={cx('menu-item')} onClick={handleLogout}>
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            )}
        >
            <div className={cx('wrapper-avatar')} onClick={handleToggle}>
                <img className={cx('avatar')} src={images.user} alt={'PhamHuyThang'} />
                <div className={cx('info')}>
                    <span className={cx('name')}>
                        <img className={cx('image-name')} src={images.name} alt="name" />
                        {account.fullName}
                    </span>
                    <span className={cx('username')}>
                        <img className={cx('image-gift')} src={images.gift} alt="name" />
                        <span style={{ marginLeft: '5px' }}>{`0 Stars`}</span>
                    </span>
                </div>
            </div>
        </Typpy>
    );
}

export default Account;
