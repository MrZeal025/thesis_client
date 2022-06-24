import React from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

const GraphSelect = ({ graphType, handleChange}) => {
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Graph Type</InputLabel>
                <Select
                    size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={graphType}
                    label="Graph Type"
                    onChange={handleChange}
                >
                    <MenuItem value={"Line"}>Line Chart</MenuItem>
                    <MenuItem value={"Bar"}>Bar Chart</MenuItem>
                </Select>
            </FormControl>   
        </>
    );
}

export default GraphSelect;
