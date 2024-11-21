import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const DropDown = ({ searchName, data, name }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        const params = new URLSearchParams(location.search);
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        navigate(`${location.pathname}?${params.toString()}`);
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
                    {data &&
                        data.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default DropDown;
