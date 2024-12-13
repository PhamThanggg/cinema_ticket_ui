import classNames from 'classnames/bind';
import styles from './Item.module.scss';

const cx = classNames.bind(styles);

function Item({ promotionData }) {
    return (
        <div className={cx('wrapper-item', 'margin-rsp')}>
            <a className={cx('item-link')} href="/">
                <div className={cx('ctn-image')}>
                    <img className={cx('image')} src={promotionData?.imageUrl || ''} alt="Name"></img>
                </div>
                <h4 className={cx('title')}>
                    <div className={cx('tooltip')}>{promotionData?.name || 'Chưa có tiêu đề'}</div>
                </h4>
            </a>
        </div>
    );
}

export default Item;
