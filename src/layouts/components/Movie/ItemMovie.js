import classNames from 'classnames/bind';
import styles from './ItemMovie.module.scss';
import styleGrid from '~/components/GlobalStyles/Grid.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const cw = classNames.bind(styleGrid);

function ItemMovie() {
    return (
        <div className={cw('col', 'pc-3', 't-6', 'm-12')}>
            <div className={cx('wrapper-item', 'margin-rsp')}>
                <a className={cx('item-link')} href="/">
                    <div className={cx('ctn-image')}>
                        <img
                            className={cx('image')}
                            src="https://bhdstar.vn/wp-content/uploads/2024/08/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-22.jpg"
                            alt="Name"
                        ></img>
                        <div className={cx('img-hover')}>
                            <FontAwesomeIcon className={cx('play')} icon={faCirclePlay} />
                            <Button primary className={cx('buy-ticket')}>
                                Mua vé ngay
                            </Button>
                        </div>
                    </div>
                    <div className={cx('meta')}>
                        <span className={cx('age-limit', 'T18')}>T18</span>
                        <span className={cx('type')}>Phụ đề</span>
                        <span className={cx('format')}>2D</span>
                    </div>
                    <h4 className={cx('title')}>
                        <span className={cx('tooltip')}>Longlegs: THẢM Kịch dị giáo THẢM K THẢM K THẢM K</span>
                    </h4>
                    <div className={cx('cats')}>
                        Thể loại phim:
                        <span className={cx('movie-type')}>Crime</span>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default ItemMovie;
