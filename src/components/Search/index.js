import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchFields({ onSearch }) {
    return (
        <Box style={{ width: "300px" }}>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-end',  
                marginBottom: '10px',
            }}
            >
                <div 
                    className='shadowcustom'
                    style={{ 
                        backgroundColor: "white", 
                        paddingLeft: "20px", 
                        paddingRight: "20px",
                        paddingBottom: "10px",
                        borderRadius: "5px",
                    }}
                >
                    <SearchIcon sx={{ color: 'action.active', marginTop: "10%", mr: 1 }} />
                    <TextField label="Search" variant="standard" onChange={e => { onSearch(e.target.value)}} />
                </div>
            </Box>
        </Box>
    );
    }
