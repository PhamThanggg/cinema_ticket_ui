import classNames from 'classnames/bind';
import styles from './FoodSelection.module.scss';
import QuantityInput from '~/components/QuantityInput';
import { useEffect, useState } from 'react';
import { GetItemApi } from '~/service/ItemService';
import { formatVND } from '~/utils/vndPrice';

const cx = classNames.bind(styles);

function FoodSelection({ setItem }) {
    const [selectItem, setSelectItem] = useState(null);
    const [itemsWithQuantity, setItemsWithQuantity] = useState([]);

    useEffect(() => {
        const getSeatSelect = async () => {
            const schedule = JSON.parse(localStorage.getItem('schedule'));

            if (schedule && schedule.cinemaId) {
                const data = await GetItemApi(schedule.cinemaId);

                if (data && data.result) {
                    setSelectItem(data.result);
                }
            }
        };

        getSeatSelect();
    }, []);

    useEffect(() => {
        setItem(itemsWithQuantity);
    }, [itemsWithQuantity]);

    const handleQuantityChange = (updatedItem, updatedQuantity) => {
        setItemsWithQuantity((prevItems) => {
            // If quantity is 0, remove the item from the array
            if (updatedQuantity === 0) {
                const filteredItems = prevItems.filter((i) => i.item.id !== updatedItem.id);
                return filteredItems;
            }

            const existingItemIndex = prevItems.findIndex((i) => i.item.id === updatedItem.id);

            if (existingItemIndex !== -1) {
                // Update the existing item's quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    count: updatedQuantity,
                };
                return updatedItems;
            } else {
                // Add the new item with its quantity
                return [...prevItems, { item: updatedItem, count: updatedQuantity }];
            }
        });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>Chọn đồ đi kèm</div>
                {selectItem &&
                    selectItem.map((data, index) => (
                        <div className={cx('ctn')} key={index}>
                            <div className={cx('item')}>
                                <div className={cx('img')}>
                                    <img className={cx('image')} src={data?.imageUrl || ''} alt="" />
                                </div>
                                <div className={cx('title')}>
                                    <p className={cx('name')}>{data?.name || ''}</p>
                                    <p className={cx('des')}>{data?.description || ''}</p>
                                    <p className={cx('price')}>Giá: {formatVND(data?.price || 10000)} </p>
                                </div>
                            </div>
                            <div className={cx('quantity')}>
                                <QuantityInput
                                    initialQuantity={itemsWithQuantity.find((i) => i.item.id === data.id)?.count || 0}
                                    onQuantityChange={(newQuantity) => handleQuantityChange(data, newQuantity)}
                                    max={100}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default FoodSelection;
