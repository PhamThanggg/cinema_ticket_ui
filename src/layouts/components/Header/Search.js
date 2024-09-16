import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search({ onClose }) {
    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon className={cx('icon')} icon={faClose} onClick={onClose} />
            <div className={cx('movie')}>MOVIE TICKET</div>
            <div className={cx('search')}>
                <input className={cx('input')} placeholder="Nhập Tên phim" />
                <FontAwesomeIcon className={cx('icon-search')} icon={faSearch} />
            </div>
        </div>
    );
}

export default Search;
