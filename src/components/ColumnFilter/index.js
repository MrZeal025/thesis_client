import React from 'react'

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';

export default function CustomFilters({ filterA, locationFilter }) {

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const [startDate, setStateDate] = React.useState(Date.now());
    const [endDate, setEndDate] = React.useState(tomorrow);

    return (
        <Box className='d-flex mb-2'>
            <Box
                sx={{ boxShadow: 1 }} 
                style={{ backgroundColor: "white", padding: "10px", borderRadius: '5px', marginRight: "10px" }}
            >
                <Typography 
                    variant="p" 
                    noWrap 
                    component="div" 
                    style={{ 
                        marginBottom: "10px", 
                        fontSize: "12px",  
                        fontWeight: "bold", 
                        color: "#2a749f"
                    }}
                >
                    Filter by location
                </Typography>
                <Autocomplete
                    multiple
                    id="size-small-filled-multi"
                    options={filterA}
                    getOptionLabel={(option) => option.location}
                    defaultValue={[]}
                    style={{ minWidth: "300px", maxWidth: "700px" }}
                    onChange={(event, newValue) => {
                        locationFilter(newValue)
                    }}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                variant="outlined"
                                label={option.location}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Filter Location"
                        />
                    )}
                />
            </Box>
            <Box 
                sx={{ boxShadow: 1 }} 
                style={{ backgroundColor: "white", padding: "10px", borderRadius: '5px' }}
            >
                <Typography variant="p" 
                    noWrap 
                    component="div" 
                    style={{ 
                        marginBottom: "10px", 
                        fontSize: "12px",  
                        fontWeight: "bold", 
                        color: "#2a749f"
                    }}>
                    Filter by Date Range
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => {
                            setStateDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                        }}
                        renderInput={(params) => <TextField style={{ marginLeft: "10px"}} {...params} />}
                    />
                </LocalizationProvider>
            </Box>
        </Box>
    )
}
