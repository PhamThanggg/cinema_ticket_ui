import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Quantity.module.scss';

const cx = classNames.bind(styles);

function QuantityInput({ initialQuantity, onQuantityChange, max }) {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const handleIncrease = () => {
        let newQuantity = quantity + 1;
        if (newQuantity > max) {
            newQuantity = max;
        }
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const handleDecrease = () => {
        const newQuantity = quantity > 0 ? quantity - 1 : 0;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const handleInputChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (value > max) {
            value = max;
        }
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
            onQuantityChange(value);
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
