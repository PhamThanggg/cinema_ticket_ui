import classNames from 'classnames/bind';
import styles from './FoodSelection.module.scss';
import QuantityInput from '~/components/QuantityInput';

const cx = classNames.bind(styles);

function FoodSelection() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>Chọn đồ đi kèm</div>
                <div className={cx('ctn')}>
                    <div className={cx('item')}>
                        <div className={cx('img')}>
                            <img
                                className={cx('image')}
                                src="https://cdn.galaxycine.vn/media/2024/3/29/menuboard-coonline-2024-combo1-min_1711699834430.jpg"
                                alt=""
                            />
                        </div>
                        <div className={cx('title')}>
                            <p className={cx('name')}>iCombo1</p>
                            <p className={cx('des')}>1 Ly nước ngọt size L + 01 Hộp bắp + 1 Snack</p>
                            <p className={cx('price')}>Giá: 109.000 ₫</p>
                        </div>
                    </div>
                    <div className={cx('quantity')}>
                        <QuantityInput />
                    </div>
                </div>

                <div className={cx('ctn')}>
                    <div className={cx('item')}>
                        <div className={cx('img')}>
                            <img
                                className={cx('image')}
                                src="https://cdn.galaxycine.vn/media/2024/3/29/menuboard-coonline-2024-combo1-min_1711699834430.jpg"
                                alt=""
                            />
                        </div>
                        <div className={cx('title')}>
                            <p className={cx('name')}>iCombo1</p>
                            <p className={cx('des')}>1 Ly nước ngọt size L + 01 Hộp bắp + 1 Snack</p>
                            <p className={cx('price')}>Giá: 109.000 ₫</p>
                        </div>
                    </div>
                    <div className={cx('quantity')}>
                        <QuantityInput />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodSelection;
