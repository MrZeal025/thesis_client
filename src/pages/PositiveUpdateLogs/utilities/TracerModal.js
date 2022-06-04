import React, { useState } from 'react'
// import package/s
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

// components
import PositiveUserProfile from './UserProfile'
import CloseContactTable from './CloseContactTable'
import VisitationHistoryTable from './VisitationHistoryTable'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ width: "100%"}}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CloseContactTracerModal = ({ showFunction, onHideFunction, data, closeContactData, visitationHistroyData }) => {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Dialog 
                fullScreen
                open={showFunction} 
                onClose={onHideFunction}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: "#2a749f"}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onHideFunction}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Positive Case Information Summary</Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ width: '100%', padding: "2%" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="User Information" {...a11yProps(0)} />
                        <Tab label="Visitation History" {...a11yProps(1)} />
                        <Tab label="Close Contacts" {...a11yProps(2)} />
                    </Tabs>
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                        <TabPanel value={value} index={0}>
                            <PositiveUserProfile
                                data={data}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <VisitationHistoryTable
                                data={visitationHistroyData}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <CloseContactTable
                                data={closeContactData}
                            />
                        </TabPanel>
                    </Tabs>
                </Box>
            </Dialog>
        </>
    );
};

export default CloseContactTracerModal;
