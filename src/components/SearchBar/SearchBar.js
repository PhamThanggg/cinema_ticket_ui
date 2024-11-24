import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const SearchBar = ({ name, label }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        const params = new URLSearchParams(location.search);

        if (searchValue) {
            params.set(name, searchValue);
        } else {
            params.delete(name);
        }

        navigate(`${location.pathname}?${params.toString()}`);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '260px' }}>
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={searchValue}
                label={label ? label : 'Search'}
                InputProps={{
                    style: {
                        fontSize: '13px',
                        width: '250px',
                    },
                }}
                InputLabelProps={{
                    style: {
                        fontSize: '13px',
                    },
                }}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <IconButton
                onClick={handleSearch}
                className={cx('custom-icon-button')}
                style={{ fontSize: '36px', padding: '10px', marginLeft: '2px', borderRadius: '4px' }}
            >
                <SearchIcon />
            </IconButton>
        </div>
    );
};

export default SearchBar;
