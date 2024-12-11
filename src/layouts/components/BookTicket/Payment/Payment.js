import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { useAuth } from '~/components/Context/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PromotionApi } from '~/service/PromotionService';

const cx = classNames.bind(styles);

function Payment({ selectedPaymentMethod, setSelectedPaymentMethod, ...props }) {
    const { state } = useAuth();
    const { account } = state;
    const [promotion, setPromotion] = useState('');
    const [star, setStar] = useState(null);

    const handleRadioChange = (e) => {
        const value = e.target.value;
        // Nếu radio đã được chọn lại thì bỏ chọn
        setSelectedPaymentMethod(selectedPaymentMethod === value ? '' : value);
    };

    const handlePromotion = async () => {
        if (!promotion.trim()) {
            toast.warning('Bạn chưa nhập mã giảm giá');
            return;
        } else if (promotion.length < 3 || promotion.length > 30) {
            toast.warning('Vui lòng nhập trong khoảng từ 3 - 30 ký tự');
            return;
        }

        const res = await PromotionApi(promotion);
        if (res && res.result && res.result.promotionType !== 'CODE') {
            toast.warning('Mã giảm giá không hợp lệ');
            return;
        } else if (res && res.result && res.result.min && res.result.max) {
            if (props.totalPrice < res.result.min || props.totalPrice > res.result.max) {
                toast.warning('Bạn không đủ điều kiện sử dụng mã giảm giá');
                return;
            }
        }

        if (res && res.result && res.result.promotionType === 'CODE') {
            props.setPromotion(res.result);
            localStorage.setItem('promotion', JSON.stringify(res.result));
            toast.success('Đã áp dụng mã giảm giá');
        }
    };

    const handleStar = () => {
        if (star === null || star === '') {
            toast.warning('Bạn chưa nhập điểm star');
            return;
        } else if (star < 20 || star > 100) {
            toast.warning('Bạn chỉ được đổi từ 20 - 100 điểm');
            return;
        }

        if (account.star > star) {
            props.setStar(star);
            localStorage.setItem('star', star);
            toast.success('Đã áp dụng điểm star');
        } else {
            toast.success('Bạn không đủ điểm star');
        }
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('info')}>Khuyến mãi</div>
                    <div className={cx('ctn')}>
                        <div className={cx('ctn_input')}>
                            <div className={cx('code')}>Mã khuyến mãi</div>
                            <input className={cx('input')} type="text" onChange={(e) => setPromotion(e.target.value)} />
                            <button className={cx('btn')} onClick={handlePromotion}>
                                Áp dụng
                            </button>

                            <div className={cx('star')}>Áp dụng điểm stars</div>
                            <input
                                className={cx('input_star')}
                                type="number"
                                onChange={(e) => setStar(e.target.value)}
                            />
                            <button className={cx('btn_start')} onClick={handleStar}>
                                ÁP dụng
                            </button>
                            <p style={{ fontSize: '14px', opacity: '0.9' }}>Bạn đang có {account.star} điểm Stars</p>
                        </div>
                        <div className={cx('star_ctn')}>
                            <div>Lưu ý: </div>
                            <p>Điểm Stars có thể quy đổi thành tiền để mua vé hoặc bắp/nước.</p>
                            <p>- 1 Stars = 1,000 VNĐ</p>
                            <p>- Trên 1 giao dịch: tối thiểu là 20 điểm và tối đa là 100 điểm.</p>
                            <div style={{ marginTop: '5px' }}>Điểm tích lũy</div>
                            <p>- Thành viên Star: 3% trên tổng số tiền giao dịch.</p>
                            <p>- Thành viên G-Star: 5% trên tổng số tiền giao dịch.</p>
                            <p>- Thành viên X-Star: 10% trên tổng số tiền giao dịch.</p>
                            <div style={{ marginTop: '5px' }}>
                                Ví dụ: hóa đơn giao dịch của khách hàng là 100,000 VNĐ, hạng thành viên Star. Số stars
                                tích được sẽ là 3 stars, tương đương với 3,000 VNĐ
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('info')}>Phương thức thanh toán</div>
                    <div className={cx('payment')} onClick={() => handleRadioChange({ target: { value: 'vnpay' } })}>
                        <input
                            className={cx('payment_input')}
                            type="radio"
                            id="vnpay"
                            name="payment"
                            value="vnpay"
                            checked={selectedPaymentMethod === 'vnpay'}
                            onChange={handleRadioChange}
                        />
                        <img
                            className={cx('payment_img')}
                            src="https://vn.viecnganhluat.com/wp-content/uploads/2023/02/ung-dung-Vi-VNPAY-%E2%80%93-Vi-cua-Gia-dinh.jpg"
                            alt=""
                        />
                        <p className={cx('payment_txt')}>Ví VNPay</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
