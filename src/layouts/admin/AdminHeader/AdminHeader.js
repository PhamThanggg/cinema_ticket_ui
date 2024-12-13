import classNames from 'classnames/bind';
import styles from './AdminHeader.module.scss';
import { Link } from 'react-router-dom';
import { MenuAdminIcon } from '~/components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typpy from '@tippyjs/react/headless';
import {
    faAngleDown,
    faAngleRight,
    faCity,
    faClock,
    faCookie,
    faFilm,
    faGauge,
    faGift,
    faLayerGroup,
    faPerson,
    faReceipt,
    faShield,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import routes from '~/config/router';
import { LogoutApi } from '~/service/auth';
import { useAuth } from '~/components/Context/AuthContext';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Header({ toggleSidebar, isSidebarVisible }) {
    const { state, logout } = useAuth();
    const [expandedItems, setExpandedItems] = useState(Array(11).fill(false));

    const toggleCollapse = (index) => {
        setExpandedItems((prevState) => prevState.map((item, i) => (i === index ? !item : item)));
    };

    // Each item includes links with labels and paths
    const sidebarItems = [
        {
            label: 'Dashboards',
            icon: <FontAwesomeIcon icon={faGauge} className={cx('dashboard_icon')} />,
            links: [
                { label: 'Tổng quan', path: routes.Admin },
                { label: 'Doanh thu theo phim', path: routes.revenueMovie },
                { label: 'Doanh thu theo rạp', path: routes.revenueCinema },
            ],
        },
        {
            label: 'Quản lý rạp',
            icon: <FontAwesomeIcon icon={faCity} className={cx('dashboard_icon')} />,
            links: [
                { label: 'Danh sách rạp', path: routes.CinemaManagement },
                { label: 'Thêm rạp', path: routes.CinemaAdd },
                { label: 'Thêm khu vực', path: routes.ListArea },
            ],
        },
        {
            label: 'Quản lý phim',
            icon: <FontAwesomeIcon icon={faFilm} className={cx('dashboard_icon')} />,
            links: [
                { label: 'Danh sách phim', path: routes.ListMovie },
                { label: 'Thêm phim', path: routes.MovieAdd },
            ],
        },
        {
            label: 'Quản lý thể loại',
            icon: <FontAwesomeIcon icon={faLayerGroup} className={cx('dashboard_icon')} />,
            links: [{ label: 'Danh sách thể loại', path: routes.ListGenre }],
        },
        {
            label: 'Quản lý suất chiếu',
            icon: <FontAwesomeIcon icon={faClock} className={cx('dashboard_icon')} />,
            links: [{ label: 'Danh sách suất chiếu', path: routes.ListSchedule }],
        },
        {
            label: 'Quản lý combo',
            icon: <FontAwesomeIcon icon={faCookie} className={cx('dashboard_icon')} />,
            links: [{ label: 'Danh sách combo', path: routes.ListCombo }],
        },
        {
            label: 'Quản lý đơn hàng',
            icon: <FontAwesomeIcon icon={faReceipt} className={cx('dashboard_icon')} />,
            links: [{ label: 'Danh sách đơn hàng', path: routes.ListBooking }],
        },
        {
            label: 'Quản lý người dùng',
            icon: <FontAwesomeIcon icon={faUser} className={cx('dashboard_icon')} />,
            links: [{ label: 'Danh sách người dùng', path: routes.ListUser }],
        },
        {
            label: 'Quản lý quyền',
            icon: <FontAwesomeIcon icon={faShield} className={cx('dashboard_icon')} />,
            links: [{ label: 'Danh sách vai trò', path: routes.ListRole }],
        },
        {
            label: 'Quản lý khuyến mãi',
            icon: <FontAwesomeIcon icon={faGift} className={cx('dashboard_icon')} />,
            links: [{ label: 'Danh sách khuyến mãi', path: routes.ListPromotion }],
        },
        {
            label: 'Quản lý diễn viên',
            icon: <FontAwesomeIcon icon={faPerson} className={cx('dashboard_icon')} />,
            links: [{ label: 'Danh sách diễn viên', path: routes.ListActor }],
        },
    ];

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
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('left')}>
                    <div className={cx('menu_icon')} onClick={toggleSidebar}>
                        <MenuAdminIcon className={cx('icon')} />
                    </div>
                    <Link className={cx('img_link')}>Admin</Link>
                </div>

                <div>
                    <Typpy
                        interactive={true}
                        hideOnClick={false}
                        delay={[0, 0]}
                        offset={[0, 0]}
                        touch={true}
                        placement={'bottom-start'}
                        onClickOutside={() => setVisible(false)}
                        onShow={() => setVisible(true)}
                        onHide={() => setVisible(false)}
                        render={(attrs) => (
                            <div className={cx('dropdown-menu')} tabIndex="-1" {...attrs}>
                                <ul className={cx('menu-list-respon')}>
                                    <Link to={'/'}>
                                        <li className={cx('menu-item')}>Trang chủ</li>
                                    </Link>
                                    <Link to={'/profile#personalInfo'}>
                                        <li className={cx('menu-item')}>Tài khoản</li>
                                    </Link>
                                    <li className={cx('menu-item')} onClick={handleLogout}>
                                        Đăng xuất
                                    </li>
                                </ul>
                            </div>
                        )}
                    >
                        <div className={cx('wrapper-avatar')} onClick={handleToggle}>
                            <img
                                className={cx('avatar')}
                                src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                                alt={'PhamHuyThang'}
                            />
                            <div className={cx('info')}>
                                <span className={cx('name')}>PhamHuyThang</span>
                            </div>
                        </div>
                    </Typpy>
                </div>
            </div>

            <div className={cx('sidebar', { visible: isSidebarVisible })}>
                <div className={cx('sidenav')}>
                    {sidebarItems.map((item, index) => (
                        <div key={index}>
                            <div className={cx('item')} onClick={() => toggleCollapse(index)}>
                                <div className={cx('item_left')}>
                                    <div className={cx('db_icon')}>{item.icon}</div>
                                    {item.label}
                                </div>
                                <div>
                                    <FontAwesomeIcon
                                        icon={expandedItems[index] ? faAngleDown : faAngleRight}
                                        className={cx('down_icon')}
                                    />
                                </div>
                            </div>

                            <div
                                className={cx('collapse', { show: expandedItems[index] })}
                                style={{
                                    maxHeight: expandedItems[index] ? '300px' : '0',
                                    transition: 'max-height 0.3s ease',
                                }}
                            >
                                <nav className={cx('sidenav-menu-nested')}>
                                    {item.links.map((link, linkIndex) => (
                                        <Link key={linkIndex} to={link.path} className={cx('nav-link')}>
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ height: '100px' }}></div>
            </div>
        </div>
    );
}

export default Header;
