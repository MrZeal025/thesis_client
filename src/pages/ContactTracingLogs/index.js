import React, { useState, useEffect } from 'react'

import './contactTracingLogs.css'
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

    const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        let arrData = typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;
        let CSV = "";
        //This condition will generate the Label/Header
        if (ShowLabel) {
            let row = "";
            //This loop will extract the label from 1st index of on array
            for (let index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ",";
            }
            row = row.slice(0, -1);
            //append Label row with line break
            CSV += row + "\r\n";
        }
        //1st loop is to extract each row
        for (let i = 0; i < arrData.length; i++) {
            let row = "";
            //2nd loop will extract each column and convert it in string comma-seprated
            for (let index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            //add a line break after each row
            CSV += row + "\r\n";
        }
        if (CSV === "") {
            alert("Invalid data");
            return;
        }
        //Generate a file name
        let fileName = "";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");
        //Initialize file format you want csv or xls
        let uri = "data:text/csv;charset=utf-8," + escape(CSV);
        //this trick will generate a temp <a /> tag
        let link = document.createElement("a");
        link.href = uri;
        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                <p className='tableCaption'>This table contains visitation logs that will be used for contact tracing purposes. No personal information from the users will be collected on the system unless they are stated as positive of COVID-19.</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <SearchFields onSearch={setQuery}/>
                    <div style={{ marginTop: "20px"}}>
                        <Refresh onRefresh={_getAllVisitationLogs}/>
                        { 
                            exportableDataState.length > 0 && 
                            <Button 
                                // onClick={() => { JSONToCSVConvertor(exportableDataState, "Visitation Histories", true)}} 
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