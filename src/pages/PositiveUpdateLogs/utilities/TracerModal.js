import React, { useState } from 'react'
// import package/s
import { Modal } from 'react-bootstrap'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// components
import PositiveUserProfile from './UserProfile'
import CloseContactTable from './CloseContactTable'
import VisitationHistoryTable from './VisitationHistoryTable'

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
            <Modal show={showFunction} fullscreen={true} onHide={onHideFunction}>
                <Modal.Header className='modal-header-bg' closeButton >
                    <Modal.Title className='modal-title' style={{ marginLeft: "10px"}}>Positive Case Information Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Box sx={{ width: '100%' }}>
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
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CloseContactTracerModal;
