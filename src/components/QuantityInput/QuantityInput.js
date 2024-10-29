import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Quantity.module.scss';

const cx = classNames.bind(styles);

function QuantityInput({ initialQuantity, onQuantityChange }) {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const handleDecrease = () => {
        const newQuantity = quantity > 0 ? quantity - 1 : 0;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

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
