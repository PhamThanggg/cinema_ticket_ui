import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search({ onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = () => {
        const params = new URLSearchParams(location.search);
        if (searchTerm.trim() && searchTerm.trim().length <= 60) {
            params.set('name', searchTerm);
            navigate();
        } else {
            setSearchTerm('');
            params.delete('name');
        }

        navigate(`${location.pathname}?${params.toString()}`);
        onClose();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon className={cx('icon')} icon={faClose} onClick={onClose} />
            <div onClick={(e) => e.stopPropagation()}>
                <div className={cx('movie')}>MOVIE TICKET</div>
                <div className={cx('search')}>
                    <input
                        className={cx('input')}
                        placeholder="Nhập Tên phim"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <FontAwesomeIcon className={cx('icon-search')} icon={faSearch} onClick={handleSearch} />
                </div>
            </div>
        </div>
    );
}

export default Search;
