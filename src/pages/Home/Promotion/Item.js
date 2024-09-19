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
                        src="https://bhdstar.vn/wp-content/uploads/2024/08/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-22.jpg"
                        alt="Name"
                    ></img>
                </div>
                <h4 className={cx('title')}>
                    <span className={cx('tooltip')}>Longlegs: THẢM Kịch dị giáo THẢM K THẢM K THẢM K</span>
                </h4>
            </a>
        </div>
    );
}

export default Item;
