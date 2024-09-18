import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import stylesGrid from '~/components/GlobalStyles/Grid.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);
const cw = classNames.bind(stylesGrid);

function Footer() {
    const movies = [
        {
            item: 'Phim',
            path: '/',
        },
        {
            item: 'Video',
            path: '/',
        },
        {
            item: 'Phim Việt',
            path: '/',
        },
        {
            item: 'Phim sắp chiếu',
            path: '/',
        },
        {
            item: 'Liên hệ với chúng tôi',
            path: '/',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cw('grid', 'wide')}>
                <div className={cw('row')}>
                    <div className={cw('col', 'pc-3', 't-6', 'm-12')}>
                        <div className={cx('wrapper-item')}>
                            <h2 className={cx('title')}>Movies</h2>
                            {movies.map((movie, index) => {
                                return (
                                    <p className={cx('item')} key={index}>
                                        {movie.item}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    <div className={cw('col', 'pc-3', 't-6', 'm-12')}>
                        <div className={cx('wrapper-item')}>
                            <h2 className={cx('title')}>Movies</h2>
                            {movies.map((movie, index) => {
                                return (
                                    <p className={cx('item')} key={index}>
                                        {movie.item}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    <div className={cw('col', 'pc-3', 't-6', 'm-12')}>
                        <div className={cx('wrapper-item')}>
                            <h2 className={cx('title')}>Movies</h2>
                            {movies.map((movie, index) => {
                                return (
                                    <p className={cx('item')} key={index}>
                                        {movie.item}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    <div className={cw('col', 'pc-3', 't-6', 'm-12')}>
                        <div className={cx('wrapper-item')}>
                            <h2 className={cx('title')}>Email</h2>
                            <div className={cx('wrapper-email')}>
                                <input className={cx('input')} type="email" placeholder="Địa Chỉ email Của Bạn" />
                                <button className={cx('btn')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                                </button>
                            </div>
                            <p className={cx('description')}>
                                Nhập email của bạn và nhận những tin tức, cập nhật mới nhất và ưu đãi đặc biệt từ chúng
                                tôi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('below')}>
                <div className={cx('container')}>
                    <div className={cx('coppyright')}>© Thang Pham</div>
                    <div className={cx('contact-icon')}>
                        <FontAwesomeIcon className={cx('icon-info')} icon={faFacebook} />
                        <FontAwesomeIcon className={cx('icon-info')} icon={faInstagram} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
