import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import images from '~/assets/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Menu from './Menu';
import DropdownMenu from './DropDownMenu';
import Account from './Account';
import Search from './Search';
import { useAuth } from '~/components/Context/AuthContext';
import { useState } from 'react';

import routes from '~/config/router';

const cx = classNames.bind(styles);

function Header({ onLoginClick }) {
    const { state } = useAuth();
    const navigate = useNavigate();

    const firm = [
        { name: 'Phim đang chiếu', link: routes.Showing },
        { name: 'Phim sắp chiếu', link: routes.ComingSoon },
    ];

    const cinemaCorner = [
        { name: 'Thể loại', link: '/the-loai' },
        { name: 'Diễn viên', link: '/dien-vien' },
        { name: 'Đạo diễn', link: '/dao-dien' },
    ];

    const event = [
        { name: 'Ưu đãi', link: '/uu-dai' },
        { name: 'Phim hay tháng', link: '/phim-hay-thang' },
    ];

    const cinema = [
        { name: 'Rạp Xuân Thủy', link: '/rap-xuan-thuy' },
        { name: 'Rạp Sala', link: '/rap-sala' },
        { name: 'Rạp Tân Bình', link: '/rap-tan-binh' },
    ];

    // Search
    const [showSearch, setShowSearch] = useState(false);

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
    };

    const handleCheckLogin = async () => {
        if (!state.isAuthenticated) {
            onLoginClick();
        } else {
            navigate(config.routes.booking);
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')} style={{ display: 'flex' }}>
                    <Link to={config.routes.home} tabIndex="-1" className={cx('logo-link')}>
                        <img className={cx('logo-img')} src={images.logo} alt="cinema"></img>
                    </Link>
                    <div className={cx('nav-ticket', 'nav-tck')}>
                        <div tabIndex="-1" onClick={handleCheckLogin}>
                            <img className={cx('ticket-img')} src={images.buyTicket} alt="" />
                        </div>
                    </div>
                </div>
                <div className={cx('navbar-collapse')}>
                    <ul className={cx('navbar-nav')}>
                        <div className={cx('nav-ticket')}>
                            <div tabIndex="-1" onClick={handleCheckLogin}>
                                <img className={cx('ticket-img')} src={images.buyTicket} alt="" />
                            </div>
                        </div>
                        <li className={cx('nav-item')}>
                            <DropdownMenu items={firm} buttonText={'Phim'} />
                        </li>
                        <li className={cx('nav-item')}>
                            <DropdownMenu items={cinemaCorner} buttonText={'Góc điện ảnh'} />
                        </li>
                        <li className={cx('nav-item')}>
                            <DropdownMenu items={event} buttonText={'Sự kiện'} />
                        </li>
                        <li className={cx('nav-item')}>
                            <DropdownMenu items={cinema} buttonText={'Rạp/Giá vé'} />
                        </li>
                        <div style={{ width: '15px' }}></div>
                    </ul>
                </div>
                <div className={cx('wrapper-info')}>
                    <div className={cx('search-item')}>
                        <Button
                            primary
                            onClick={handleSearchClick}
                            rightIcon={<FontAwesomeIcon className={cx('icon-menu')} icon={faSearch} />}
                        >
                            Search
                        </Button>
                    </div>
                    {state.isAuthenticated && (
                        <div className={cx('acc-header')}>
                            <Account offset={false} />
                        </div>
                    )}

                    {!state.isAuthenticated && (
                        <div className={cx('login')}>
                            <Button outline onClick={onLoginClick}>
                                Đăng nhập
                            </Button>
                        </div>
                    )}
                    <div className={cx('mode-container')}>
                        <i className={cx('gg-sun', 'sun-css')}></i>
                        <i className={cx('gg-moon', 'moon-css')}></i>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Menu onLoginClick={onLoginClick}>
                            <li className={cx('nav-item')}>
                                <DropdownMenu items={firm} buttonText={'Phim'} offSet={true} />
                            </li>
                            <li className={cx('nav-item')}>
                                <DropdownMenu items={cinemaCorner} buttonText={'Góc điện ảnh'} offSet={true} />
                            </li>
                            <li className={cx('nav-item')}>
                                <DropdownMenu items={event} buttonText={'Sự kiện'} offSet={true} />
                            </li>
                            <li className={cx('nav-item')}>
                                <DropdownMenu items={cinema} buttonText={'Rạp/Giá vé'} offSet={true} />
                            </li>
                        </Menu>
                    </div>
                </div>
            </div>
            {showSearch && <Search onClose={handleSearchClick} />}
        </header>
    );
}

export default Header;
