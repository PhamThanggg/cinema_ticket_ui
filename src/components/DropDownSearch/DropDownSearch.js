import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const DropDownSearch = ({ searchName, data, name, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event, value) => {
        setSelectedValue(value);

        const params = new URLSearchParams(location.search);
        if (value) {
            params.set(name, value.value); // `value.value` chứa giá trị thực tế
        } else {
            params.delete(name);
        }
        navigate(`${location.pathname}?${params.toString()}`);
    };

    return (
        <div>
            <Autocomplete
                id="searchable-dropdown"
                options={data}
                getOptionLabel={(option) => option.name || ''}
                value={selectedValue}
                onChange={handleChange}
                isOptionEqualToValue={(option, value) => option.value === value?.value}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={searchName}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            style: { fontSize: '13px', top: '-7px' },
                        }}
                        sx={{
                            fontSize: '13px',
                            width: props.width ? props.width : '140px',
                            height: '0.35em',
                            marginRight: '10px',
                        }}
                    />
                )}
                sx={{
                    width: props.width ? props.width : '140px',
                    height: '35px',
                    marginRight: '10px',
                    '& .MuiOutlinedInput-root': {
                        fontSize: '13px',
                        height: '35px',
                    },
                }}
            />
        </div>
    );
};

export default DropDownSearch;
