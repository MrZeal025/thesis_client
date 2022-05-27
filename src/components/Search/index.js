import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchFields({ onSearch }) {
    return (
        <Box style={{ width: "300px" }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end',  padding: "10px", marginBottom: "10px" }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Search" variant="standard" onChange={e => { onSearch(e.target.value)}} />
            </Box>
        </Box>
    );
    }
