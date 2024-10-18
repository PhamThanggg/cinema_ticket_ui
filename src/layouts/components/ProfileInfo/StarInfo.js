import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';
import images from '~/assets/image';
import { useAuth } from '~/components/Context/AuthContext';

const cx = classNames.bind(styles);

function StarInfo() {
    const { account } = useAuth();
    return (
        <div className={cx('wrap')}>
            <div className={cx('ctn')}>
                <div className={cx('acc')}>
                    <img
                        className={cx('avatar')}
                        src={
                            account?.image ||
                            'https://img.pikbest.com/png-images/qianku/default-avatar_2405039.png!w700wp'
                        }
                        alt="name"
                    />
                </div>
                <div className={cx('acc-name')}>
                    <p className={cx('name')}>{account?.fullName || ''}</p>
                </div>
                <div className={cx('name-stars')}>50 Stars</div>

                <div className={cx('line')}></div>

                <div className={cx('total-pay')}>
                    <span className={cx('total-txt')}>Tổng chỉ tiêu {2024}</span>
                    <span className={cx('total-number')}>
                        0 <u>đ</u>
                    </span>
                </div>

                <div className={cx('Rating_rating')}>
                    <div className={cx('Rating_steps')}>
                        <div className={cx('Rating_relative')}>
                            <div className={cx('absolute')}>
                                <img alt="Bronze Rank" width="18" height="30" src={images.logo1} />
                            </div>
                            <div className={cx('Rating_index')}></div>
                            <div className={cx('price1')}>
                                <p>0&nbsp;₫</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('Rating_steps')}>
                        <div className={cx('Rating_relative2')}>
                            <div className={cx('absolute')}>
                                <img
                                    alt="Silver Rank"
                                    width="26"
                                    height="38"
                                    className={cx('logo-price')}
                                    src={images.logo2}
                                />
                            </div>
                            <div className={cx('Rating_index')}></div>
                            <div className={cx('price2')}>
                                <p>2.000.000&nbsp;₫</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('Rating_steps')}>
                        <div className={cx('Rating_relative3')}>
                            <div className={cx('absolute')}>
                                <img
                                    alt="Gold Rank"
                                    width="32"
                                    height="46"
                                    className={cx('logo-price3')}
                                    src={images.logo3}
                                />
                            </div>
                            <div className={cx('Rating_index')}></div>
                            <div className={cx('price2')}>
                                <p>4.000.000&nbsp;₫</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StarInfo;
