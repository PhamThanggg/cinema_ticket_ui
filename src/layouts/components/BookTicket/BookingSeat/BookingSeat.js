import classNames from 'classnames/bind';
import styles from './BookinSeat.module.scss';

const cx = classNames.bind(styles);

function BookingSeat() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div className={cx('time')}>
                    <div className={cx('title-time')}>Đổi suất chiếu</div>
                    <button className={cx('btn-time')}>10:00</button>
                </div>
            </div>

            <div className={cx('cinema-seat')}>
                <div style={{ height: '10px' }}></div>
                <div className={cx('seat-info')}>
                    <div className={cx('column')}>A</div>
                    <div className={cx('row')}>
                        <button className={cx('seat')}>A99</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                    </div>
                    <div className={cx('column')}>A</div>
                </div>
                <div className={cx('seat-info')}>
                    <div className={cx('column')}>A</div>
                    <div className={cx('row')}>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat-space')}></button>
                        <span className={cx('seat-space')}></span>
                        <span className={cx('seat-space')}></span>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A1</button>
                        <button className={cx('seat')}>A2</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat-space')}></button>
                        <span className={cx('seat-space')}></span>
                        <span className={cx('seat-space')}></span>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A3</button>
                        <button className={cx('seat')}>A3</button>
                    </div>
                    <div className={cx('column')}>A</div>
                </div>

                <div className={cx('screen')}>Màn hình</div>
                <div className={cx('line')}></div>
                <div className={cx('seat-status')}>
                    <div className={cx('ctn-status')}>
                        <div className={cx('status')}>
                            <div className={cx('status-color')}></div>
                            <span className={cx('status-name')}>Ghế đã bán</span>
                        </div>
                        <div className={cx('status')}>
                            <div className={cx('status-color', 'pink')}></div>
                            <span className={cx('status-name')}>Ghế đang chọn</span>
                        </div>
                    </div>

                    <div className={cx('seat-type')}>
                        <div className={cx('type')}>
                            <div className={cx('type-color')}></div>
                            <span className={cx('type-name')}>Ghế đơn</span>
                        </div>
                        <div className={cx('type')}>
                            <div className={cx('type-color', 'vip')}></div>
                            <span className={cx('type-name')}>Ghế vip</span>
                        </div>
                        <div className={cx('type')}>
                            <div className={cx('type-color', 'double')}></div>
                            <span className={cx('type-name')}>Ghế đôi</span>
                        </div>
                    </div>
                </div>
                <div style={{ height: '1px' }}></div>
            </div>
        </div>
    );
}

export default BookingSeat;
