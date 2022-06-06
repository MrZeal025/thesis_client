import React from 'react'

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function CustomFilters({ 
    filterA, 
    filterB,
    locationFilter, 
    diseaseFilter,
    filterByDateRange 
}) {

    const today = new Date()
    const yesterDay = new Date(today)
    yesterDay.setDate(yesterDay.getDate() - 1)

    const [startDate, setStartDate] = React.useState(yesterDay.toISOString());
    const [endDate, setEndDate] = React.useState(today.toISOString());

    const submitTime = () => {
        filterByDateRange(startDate, endDate);
    }

    return (
        <Box className='d-flex mb-2'>
            {/* Location Filter */}
            <Box
                sx={{ boxShadow: 1 }} 
                style={{ 
                    backgroundColor: "white", 
                    padding: "10px", 
                    borderRadius: '5px', 
                    marginRight: "10px" 
                }}
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
                    Filter by City
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
                            label="Filter City"
                        />
                    )}
                />
            </Box>
            {/* Disease Filter */}
            <Box
                sx={{ boxShadow: 1 }} 
                style={{ 
                    backgroundColor: "white", 
                    padding: "10px", 
                    borderRadius: '5px', 
                    marginRight: "10px" 
                }}
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
                    Filter by Registered Disease
                </Typography>
                <Autocomplete
                    multiple
                    id="size-small-filled-multi"
                    options={filterB}
                    getOptionLabel={(option) => option.disease}
                    defaultValue={[]}
                    style={{ minWidth: "300px", maxWidth: "700px" }}
                    onChange={(event, newValue) => {
                        diseaseFilter(newValue)
                    }}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                variant="outlined"
                                label={option.disease}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Filter Disease"
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
                            setStartDate(newValue.toISOString());
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue.toISOString());
                        }}
                        renderInput={(params) => <TextField style={{ marginLeft: "10px"}} {...params} />}
                    />
                </LocalizationProvider>
                <Button style={{ marginLeft: "5px" }} variant="contained" onClick={() => { submitTime() }}>
                    <FilterAltIcon/>
                </Button>
            </Box>
        </Box>
    )
}
