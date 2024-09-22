import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';
import { Link } from 'react-router-dom';
import TicketInfo from './TicketInfo';
import PersonalInfo from './PersonalInfo';
import { useState } from 'react';
import Notification from './Notification';
import StarInfo from './StarInfo';

const cx = classNames.bind(styles);

function ProfileInfo() {
    const [activeTab, setActiveTab] = useState('ticketInfo');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('wrapper-start')}>
                    <StarInfo />
                </div>
                <div className={cx('information')}>
                    <div className={cx('account-nav')}>
                        <ul className={cx('tablist')}>
                            <li className={cx('item')}>
                                <Link
                                    className={cx('item-link', activeTab === 'ticketInfo' && 'nav-active')}
                                    to="#ticketInfo"
                                    onClick={() => setActiveTab('ticketInfo')}
                                >
                                    Lịch sử giao dịch
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link
                                    className={cx('item-link', activeTab === 'personalInfo' && 'nav-active')}
                                    to="#personalInfo"
                                    onClick={() => setActiveTab('personalInfo')}
                                >
                                    Thông tin cá nhân
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link
                                    className={cx('item-link', activeTab === 'notification' && 'nav-active')}
                                    to="#notification"
                                    onClick={() => setActiveTab('notification')}
                                >
                                    Thông báo
                                </Link>
                            </li>
                            {/* <li className={cx('item')}>
                                <Link
                                    className={cx('item-link', activeTab === 'reward' && 'nav-active')}
                                    to="#reward"
                                    onClick={() => setActiveTab('reward')}
                                >
                                    Quà tặng
                                </Link>
                            </li> */}
                        </ul>
                        <div className={cx('nav-line')}></div>

                        {/* children */}
                        {activeTab === 'ticketInfo' && <TicketInfo />}
                        {activeTab === 'personalInfo' && <PersonalInfo />}
                        {activeTab === 'notification' && <Notification />}
                        {/* {activeTab === 'reward' && <Reward />} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
