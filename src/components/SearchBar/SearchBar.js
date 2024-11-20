import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', searchValue);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={searchValue}
                label="Search"
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
                style={{ fontSize: '36px', padding: '10px', marginLeft: '2px', borderRadius: '4px' }}
            >
                <SearchIcon />
            </IconButton>
        </div>
    );
};

export default SearchBar;
