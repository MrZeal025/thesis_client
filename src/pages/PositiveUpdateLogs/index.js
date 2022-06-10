import React, { useState, useEffect } from 'react'
import './positiveTracingLogs.css'
// import package/s
import Helmet from 'react-helmet'
// import table Data
import { PositiveLogsCOLUMN, PositiveLogsCOLUMNExport } from '../../components/BasicTable/columns'
// component/s
import BasicTable from '../../components/BasicTable'
import HomeContainer from '../../components/HomeContainer'
// apis
import { getAllPositiveLogs, getAllCloseContact, getAllInfectedVisitationHistroy } from '../../services/positive-update-logs/get'
import CloseContactTracerModal from './utilities/TracerModal';
// utilities
import SearchFields from '../../components/Search/index.js';
import Refresh from '../../components/Refresh/index.js';
import ToastNotification from '../../components/Toast/index.js';
import { Button } from '@mui/material'

import ReportGenerator from './utilities/report-generator'

const PositiveTracingLogs = () => {

    const [positiveLogs, setContactLogs] = useState([]);
    const [exportableDataState, setExportableData] = useState([]);
    const [showTracerModal, setShowTracerModal] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [dataToBeView, setDataToBeView] = useState({});
    const [closeContactData, setCloseContactData] = useState([])
    const [VisitationHistoryData, setVisitationHistoryData] = useState([])
    const [showToast, setShowToast] = useState(false);
    const [toastStatue, setToastStatus] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [query, setQuery] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // filtering process
    const filteredData = (positiveLogs) => {
        const keys = ["gender", "age", "mobileNumber", "userType", "date"]
        return positiveLogs.filter((item) => keys.some(
            key => 
                item[key].toLowerCase().includes(query)
            ));
    }

    const _getAllVisitationLogs = async (allowToast) => {
        if(allowToast) {
            setIsFetching(true)
        }
        try {
            let exports = []
            const visitationLogs = await getAllPositiveLogs();
            setContactLogs(visitationLogs.data?.data.reverse());
            for(let i = 0; i < visitationLogs.data.data.length; i++) {
                let exportableData = {
                    firstName: visitationLogs.data.data[i].firstName,
                    middleName: visitationLogs.data.data[i].middleName,
                    lastName: visitationLogs.data.data[i].lastName,
                    gender: visitationLogs.data.data[i].gender,
                    age: visitationLogs.data.data[i].age,
                    mobileNumber: visitationLogs.data.data[i].mobileNumber,
                    nameExtension: visitationLogs.data.data[i].nameExtension,
                    healthStatus: visitationLogs.data.data[i].healthStatus,
                    userType: visitationLogs.data.data[i].userType,
                    lotNumber: visitationLogs.data.data[i].lotNumber,
                    streetName: visitationLogs.data.data[i].streetName,
                    barangay: visitationLogs.data.data[i].barangay,
                    city: visitationLogs.data.data[i].city,
                    district: visitationLogs.data.data[i].district,
                    province: visitationLogs.data.data[i].province,
                    date: visitationLogs.data.data[i].date,
                }
                exports.push(exportableData)
            }
            setExportableData(exports)
            setIsFetching(false);
            if(allowToast){
                setShowToast(!showToast);
                setToastMessage("The positive contact list has been refreshed successfully.");
                setToastStatus('Success');
            }
        } catch (error) { 
            setContactLogs([]);
            if(allowToast){
                setShowToast(!showToast);
                setToastMessage("Something went wrong!");
                setToastStatus('Error');
            }
        }
    }

    // qr code Modal Functions
    const handleContactTracing = async (id) => {
        setShowTracerModal(true);
        try {
            const closeContacts = await getAllCloseContact(id);
            const visitationHistroy = await getAllInfectedVisitationHistroy(id);
            setCloseContactData(closeContacts.data.data);
            setVisitationHistoryData(visitationHistroy.data?.data)
            // filter the data requested for editing
            const filterdData = positiveLogs.filter((positive) => { return positive.mobileNumber === id })  
            setDataToBeView(filterdData[0])
        } catch (error) {
            console.log(error)
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
                <title>JuanBreath | Positive Tracing Logs</title>
            </Helmet>
            
            <h1 className='contentTitle pb-10'>Positive Tracing Logs</h1>
            <div className='contentDiv'>
                <p className='tableCaption'>This table contains list of users that confirms they are positive. 
                Administrator can use the trace contact button to get the list of close contact of the infected individual.</p>
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
                    columnHeads = {PositiveLogsCOLUMN}
                    tableData = {filteredData(positiveLogs)}
                    hasTracing={true}
                    isFetching={isFetching}
                    tracerModalFunction={handleContactTracing}
                />
            </div>
            <CloseContactTracerModal
                data={dataToBeView}
                closeContactData={closeContactData}
                visitationHistroyData={VisitationHistoryData}
                showFunction = {showTracerModal}
                onHideFunction = {() => setShowTracerModal(!showTracerModal)}
            />
            <ReportGenerator
                show={show}
                handleClose={handleClose}
                contactLogs={positiveLogs}
                logsColumn={PositiveLogsCOLUMNExport}
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

export default PositiveTracingLogs