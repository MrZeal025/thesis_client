import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Button, Box, Paper } from '@mui/material'
// table
import CustomFilters from '../../../components/ColumnFilter/positiveLogFilter';
import BasicTable from '../../../components/BasicTable'
import { CSVLink } from "react-csv";
// silder component
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ReportGenerator = ({ show, handleClose, contactLogs, logsColumn }) => {

    const [csvData, setCSVData] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([])

    const headers = [
        { label: "First Name", key : "firstName"},
        { label: "Middle Name", key : "middleName"},
        { label: "Last Name", key : "lastName"},
        { label: "Name Extn,", key : "nameExtension"},
        { label: "Gender", key : "gender"},
        { label: "Age", key : "age"},
        { label: "Contact Number", key : "mobileNumber"},
        { label: "Health Status", key : "healthStatus"},
        { label: "User Type", key : "userType"},
        { label: "Lot", key : "lotNumber"},
        { label: "Street", key : "streetName"},
        { label: "Barangay", key : "barangay"},
        { label: "City", key : "city"},
        { label: "District", key : "district"},
        { label: "Province", key : "province"},
        { label: "Date Reported", key : "date"}
    ]

    const csvReport = {
        filename: "Positive Cases Report.csv",
        headers: headers,
        data: csvData
    }

    // filtering process
    const locationFilter = (locations) => {
        // set selected locations for reference of other filters
        setSelectedLocations(locations)
        // filtering starts here
        const filteredData = []
        
        if (locations.length === 0) {
            setCSVData(contactLogs)
        } 
        else {
            for(let i = 0; i < locations.length; i++) {
                const result = contactLogs.filter((item) => { return item.city === locations[i].location })
                filteredData.push(...result)
            }  
            setCSVData(filteredData)
        }
    }

    // filtering process
    const diseaseFilter = (diseases) => {
        const filteredData = []
        
        if (diseases.length === 0) {
            setCSVData(contactLogs)
        } 
        else {
            if(selectedLocations.length > 0) {
                for(let i = 0; i < diseases.length; i++) {
                    const result = csvData.filter((item) => { return item.disease === diseases[i].disease })
                    filteredData.push(...result)
                }  
            } 
            else {
                for(let i = 0; i < diseases.length; i++) {
                    const result = contactLogs.filter((item) => { return item.disease === diseases[i].disease })
                    filteredData.push(...result)
                }  
            }
            setCSVData(filteredData)
        }
    }

    const filterByDateRange = (start, end) => {

        let startDate = new Date(start);
        let endDate = new Date(end);

        let uStart = startDate.getTime();
        let uend = endDate.getTime();

        let dateRange = [];

        let filteredItemsByDateRange = [];

        for (let unix = uStart; unix <= uend; unix += 86400000) {
            let thisDay = new Date(unix);
            dateRange.push(thisDay.toISOString().split("T")[0])
        }

        for(let x = 0; x < dateRange.length; x++) {
            for(let i = 0; i < csvData.length; i++) {
                if(dateRange[x] === csvData[i].date) {
                    filteredItemsByDateRange.push(csvData[i])
                }
            }
        }

        setCSVData(filteredItemsByDateRange);
    }

    useEffect(() => {

        setCSVData(contactLogs);

        // locations filter
        let extractedLocations = []
        let newExtractedLocation = [] 

        for(let i = 0; i < contactLogs.length; i++) {
            extractedLocations.push(contactLogs[i].city);
        }
        
        let filteredLocation = [...new Set(extractedLocations)]

        for(let i = 0; i < filteredLocation.length; i++) {
            newExtractedLocation.push({ location: filteredLocation[i]  })
        }
        // base dataset for locations
        setLocations(newExtractedLocation);
        
        // disease filter
        let extractedDisease = []
        let newExtractedDisease = [] 

        for(let i = 0; i < contactLogs.length; i++) {
            extractedDisease.push(contactLogs[i].disease);
        }
        
        let filteredDisease = [...new Set(extractedDisease)]

        for(let i = 0; i < filteredDisease.length; i++) {
            newExtractedDisease.push({ disease: filteredDisease[i]  })
        }
        // base dataset for locations
        setDiseases(newExtractedDisease);

    },[contactLogs])

    return (
        <Dialog 
            fullScreen 
            open={show} 
            onClose={handleClose} 
            TransitionComponent={Transition}
        >
            <AppBar 
                sx={{ position: 'relative' }} 
                style={{ backgroundColor: "#2a749f"}}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Generate Positive Log Report
                    </Typography>
                    <Button 
                        variant="outlined" 
                        style={{  color: "white", border: "1px solid white"}}
                    >
                        <CSVLink 
                            style={{ color: "white", textDecoration: "none"}} 
                            {...csvReport}
                        >
                            Generate CSV
                        </CSVLink>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box style={{ backgroundColor: "#eaeaea", height: "100vh"}}>
                <DialogContent style={{ padding: "20px 50px"}}> 
                    <DialogTitle style={{ color: "#2a749f", fontWeight: "bold", fontSize: "25px", marginLeft: "-20px" }}>
                        Custom Filters
                    </DialogTitle>
                    <CustomFilters
                        filterA={locations}
                        filterB={diseases}
                        locationFilter={locationFilter}
                        diseaseFilter={diseaseFilter}
                        filterByDateRange={filterByDateRange}
                    />
                    <Paper elevation={1}>
                        <BasicTable 
                            columnHeads={logsColumn}
                            tableData={csvData}
                            hasDelete={false}
                            hasEdit={false}
                            hasQR={false}
                            isFetching={false}
                        />
                    </Paper>
                </DialogContent>
            </Box>
        </Dialog>
    )
}

export default ReportGenerator