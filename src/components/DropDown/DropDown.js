import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, Input } from '@mui/material';

const DropDown = ({ searchName }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setError(false);
    };

    const handleBlur = () => {
        if (!selectedValue) {
            setError(true);
        }
    };

    return (
        <div>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="dropdownDlabel" style={{ fontSize: '13px', top: '-7px' }}>
                    {searchName}
                </InputLabel>
                <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={selectedValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Chọn thể loại"
                    fullWidth
                    sx={{
                        fontSize: '13px',
                        width: '140px',
                        height: '35px',
                        marginRight: '10px',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Hành động</MenuItem>
                    <MenuItem value={2}>Hài</MenuItem>
                    <MenuItem value={3}>Kinh dị</MenuItem>
                    <MenuItem value={4}>Lãng mạn</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default DropDown;
