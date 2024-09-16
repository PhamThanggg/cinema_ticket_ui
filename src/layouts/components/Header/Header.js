import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import images from '~/assets/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '~/components/Button';
import Menu from './Menu';
import DropdownMenu from './DropDownMenu';
import Account from './Account';
import Search from './Search';

const cx = classNames.bind(styles);

function Header() {
    const firm = ['Phim đang chiếu', 'Phim sắp chiếu'];
    const cinemaCorner = ['Thể loại', 'Diễn viên', 'Đạo diễn'];
    const event = ['Ưu đãi', 'Phim hay tháng', 'Đạo diễn'];
    const cimema = ['Rap Xuân Thủy', 'Rạp Sala', 'Rạp tân bình'];

    // Search
    const [showSearch, setShowSearch] = useState(false);

    const handleSearchClick = () => {
        setShowSearch(!showSearch); // Bật/tắt Search
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')} style={{ display: 'flex' }}>
                    <Link to={config.routes.home} tabIndex="-1" className={cx('logo-link')}>
                        <img className={cx('logo-img')} src={images.logo} alt="TikTok"></img>
                    </Link>
                    <div className={cx('nav-ticket', 'nav-tck')}>
                        <a href="/" tabIndex="-1">
                            <img className={cx('ticket-img')} src={images.buyTicket} alt="" />
                        </a>
                    </div>
                </div>
                <div className={cx('navbar-collapse')}>
                    <ul className={cx('navbar-nav')}>
                        <div className={cx('nav-ticket')}>
                            <a href="/" tabIndex="-1">
                                <img className={cx('ticket-img')} src={images.buyTicket} alt="" />
                            </a>
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
                            <DropdownMenu items={cimema} buttonText={'Rạp/Giá vé'} />
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
                    <Account offset={false} />
                    <div className={cx('mode-container')}>
                        <i className={cx('gg-sun', 'sun-css')}></i>
                        <i className={cx('gg-moon', 'moon-css')}></i>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Menu>
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
                                <DropdownMenu items={cimema} buttonText={'Rạp/Giá vé'} offSet={true} />
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
