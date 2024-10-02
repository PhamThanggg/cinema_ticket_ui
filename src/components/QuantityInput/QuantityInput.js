import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Quantity.module.scss';

const cx = classNames.bind(styles);

function QuantityInput() {
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className={cx('btn_de')} onClick={handleDecrease}>
                -
            </button>
            <input className={cx('number')} type="number" min="0" value={quantity} onChange={handleInputChange} />
            <button className={cx('btn_in')} onClick={handleIncrease}>
                +
            </button>
        </div>
    );
}

export default QuantityInput;
