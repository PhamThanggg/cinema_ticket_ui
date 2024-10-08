import classNames from 'classnames/bind';
import styles from './Payment.module.scss';

const cx = classNames.bind(styles);

function Payment() {
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('info')}>Khuyến mãi</div>
                    <div className={cx('ctn')}>
                        <div className={cx('ctn_input')}>
                            <div className={cx('code')}>Mã khuyến mãi</div>
                            <input className={cx('input')} type="text" />
                            <button className={cx('btn')}>Áp dụng</button>

                            <div className={cx('star')}>Áp dụng điểm stars</div>
                            <input className={cx('input_star')} type="text" />
                            <button className={cx('btn_start')}>ÁP dụng</button>
                            <p style={{ fontSize: '14px', opacity: '0.9' }}>Bạn đang có 0 điểm Stars</p>
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
                    <div className={cx('payment')}>
                        <input className={cx('payment_input')} type="radio" />
                        <img
                            className={cx('payment_img')}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJoSZT_5VBdOUEyntQbuFTYw7W2PqpHagw2Q&s"
                            alt=""
                        />
                        <p className={cx('payment_txt')}>Ví điện tử MOMO</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
