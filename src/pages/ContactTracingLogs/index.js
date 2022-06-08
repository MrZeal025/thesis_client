import React, { useState, useEffect } from 'react'
// import package/s
import Helmet from 'react-helmet'
// import table Data
import { LogsCOLUMN } from '../../components/BasicTable/columns'
// component/s
import BasicTable from '../../components/BasicTable'
import HomeContainer from '../../components/HomeContainer'
// apis
import { getAllVisitationLogs } from '../../services/contact-logs/get'
// utilities
import SearchFields from '../../components/Search/index.js';
import Refresh from '../../components/Refresh/index.js';
import ToastNotification from '../../components/Toast/index.js';
import { Button } from '@mui/material'

import ReportGenerator from './utilities/report-generator'

const ContactTracingLogs = () => {

    const [contactLogs, setContactLogs] = useState([]);
    const [exportableDataState, setExportableData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastStatue, setToastStatus] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [query, setQuery] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // filtering process
    const filteredData = (contactLogs) => {
        const keys = ["location", "time", "action", "date"]
        return contactLogs.filter((item) => keys.some(key => item[key].toLowerCase().includes(query) || item["userId"]["mobileNumber"].toLowerCase().includes(query)));
    }

    const _getAllVisitationLogs = async (allowToast) => {
        if(allowToast) {
            setIsFetching(true)
        }
        try {
            let exports = []
            const visitationLogs = await getAllVisitationLogs();
            setContactLogs(visitationLogs.data?.data);
            for(let i = 0; i < visitationLogs.data.data.length; i++) {
                let exportableData = {
                    location: visitationLogs.data.data[i].location,
                    healthStatus: visitationLogs.data.data[i].userId.userHealthStatus,
                    userType: visitationLogs.data.data[i].userId.userType,
                    date: visitationLogs.data.data[i].date,
                    time: visitationLogs.data.data[i].time,
                    action: visitationLogs.data.data[i].action
                }
                exports.push(exportableData)
            }
            setExportableData(exports)
            setIsFetching(false);
            if(allowToast){
                setShowToast(!showToast);
                setToastMessage("The visitation history list has been refreshed successfully.");
                setToastStatus('Success');
            }
        } catch (error) { 
            setExportableData([])
            setContactLogs([]);
            if(allowToast){
                setShowToast(!showToast);
                setToastMessage("Something went wrong!");
                setToastStatus('Error');
            }
        }
    }

    useEffect(() => {
        _getAllVisitationLogs();
        // eslint-disable-next-line
    }, []);

    return (
        <HomeContainer>
            {/* Helmet for page's title*/}
            <Helmet>
                <title>JuanBreath | Visitation Logs</title>
            </Helmet>
            
            <h1 className='contentTitle pb-10'>Visitation Logs</h1>
            <div className='contentDiv'>
                <p className='tableCaption'>This table contains visitation logs that will be used for contact tracing purposes. No personal information from the users will be collected on the system unless they are stated as positive of a disease.</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <SearchFields onSearch={setQuery}/>
                    <div style={{ marginTop: "20px"}}>
                        <Refresh onRefresh={_getAllVisitationLogs}/>
                        { 
                            exportableDataState.length > 0 && 
                            <Button 
                                onClick={() => { handleShow() }}
                                className='primaryBtn'
                                variant="contained"
                            >
                                Export CSV
                            </Button>}
                    </div>
                </div>
                <BasicTable 
                    columnHeads = {LogsCOLUMN}
                    tableData = {filteredData(contactLogs)}
                    hasDelete={false}
                    hasEdit={false}
                    hasQR={false}
                    isFetching={isFetching}
                />
            </div>
            <ReportGenerator
                show={show}
                handleClose={handleClose}
                contactLogs={contactLogs}
                logsColumn={LogsCOLUMN}
            />
            <ToastNotification
                showToast={showToast}
                setShowToast={setShowToast}
                message={toastMessage}
                status={toastStatue}
            />
        </HomeContainer>
        
    )
}

export default ContactTracingLogs