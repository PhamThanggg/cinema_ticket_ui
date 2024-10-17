import classNames from 'classnames/bind';
import styles from './Item.module.scss';

const cx = classNames.bind(styles);

function Item() {
    return (
        <div className={cx('wrapper-item', 'margin-rsp')}>
            <a className={cx('item-link')} href="/">
                <div className={cx('ctn-image')}>
                    <img
                        className={cx('image')}
                        src="https://cdn.galaxycine.vn/media/2024/10/9/dam-cuoi-xa-hoa---uu-dai-xa-xi-chi-co-o-galaxy-cinema-3_1728462270936.jpg"
                        alt="Name"
                    ></img>
                </div>
                <h4 className={cx('title')}>
                    <div className={cx('tooltip')}>Đám Cưới Xa Hoa - Ưu Đãi Xa Xỉ</div>
                </h4>
            </a>
        </div>
    );
}

export default Item;
