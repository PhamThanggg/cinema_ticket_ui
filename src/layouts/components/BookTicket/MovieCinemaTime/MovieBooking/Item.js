import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Item({ isSelected }) {
    return (
        <div className={cx('wrapper-item', 'margin-rsp')}>
            <div className={cx('item-link')}>
                <div className={cx('ctn-image')}>
                    <img
                        className={cx('image')}
                        src="https://bhdstar.vn/wp-content/uploads/2024/08/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-22.jpg"
                        alt="Name"
                    ></img>
                    {isSelected && (
                        <div>
                            <div className={cx('tick')}></div>
                            <FontAwesomeIcon icon={faCheck} className={cx('check')} />
                        </div>
                    )}
                </div>
                <h4 className={cx('title')}>
                    <span className={cx('tooltip')}>Longlegs: THẢM Kịch dị giáo THẢM K THẢM K THẢM K</span>
                </h4>
            </div>
        </div>
    );
}

export default Item;
