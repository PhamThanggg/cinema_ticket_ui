import classNames from 'classnames/bind';
import styles from './Confirmation.module.scss';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { ConfirmPayment } from '~/service/PaymentService';
import { useAuth } from '~/components/Context/AuthContext';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Confirmation() {
    const { state } = useAuth();
    const { token } = state;

    const tabTitles = ['Chọn phim / Rạp / Suất', 'Chọn ghế', 'Chọn thức ăn', 'Thanh toán', 'Xác nhận'];
    const tabs = ['ticketInfo', 'bookingSeat', 'foodInfo', 'payment', 'confirmation'];

    const navigate = useNavigate();

    useEffect(() => {
        const currentUrl = new URL(window.location.href);
        const data = {};

        for (const [key, value] of currentUrl.searchParams.entries()) {
            data[key] = value;
        }

        localStorage.removeItem('area');
        localStorage.removeItem('movie');
        localStorage.removeItem('schedule');
        localStorage.removeItem('seat');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('timestamp');
        localStorage.removeItem('itemBooked');
        localStorage.removeItem('star');
        localStorage.removeItem('promotion');

        const confirmPayment = async () => {
            try {
                const response = await ConfirmPayment(JSON.stringify(data), token);

                if (response.result === 1) {
                    console.log('Payment confirmed successfully.');
                } else {
                    console.error('Payment confirmation failed.');
                }
            } catch (error) {
                console.error('Error confirming payment:', error);
            }
        };

        confirmPayment();
    }, [navigate]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('information')}>
                <div className={cx('nav')}>
                    <div className={cx('account-nav')}>
                        <ul className={cx('tablist')}>
                            {tabs.map((tab, index) => (
                                <li className={cx('item')} key={tab}>
                                    <div
                                        className={cx(
                                            'item-link',
                                            'nav-active',
                                            tab !== 'confirmation' ? 'nav-active-before' : '',
                                        )}
                                    >
                                        {tabTitles[index]}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={cx('confirm')}>
                    <h3 className={cx('confirm_title')}>Xác nhận thanh toán</h3>
                </div>
                <div className={cx('confirm_des')}>okoko</div>
                <div className={cx('btn')}>
                    <Button primary onClick={() => navigate('/')}>
                        Trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
