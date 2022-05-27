import React, { useState, useEffect } from 'react'
import './positiveTracingLogs.css'
// import package/s
import Helmet from 'react-helmet'
// import table Data
import { PositiveLogsCOLUMN } from '../../components/BasicTable/columns'
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

    // filtering process
    const filteredData = (positiveLogs) => {
        const keys = ["firstName", "middleName", "lastName", "mobileNumber", "userType", "date"]
        return positiveLogs.filter((item) => keys.some(
            key => 
                item[key].toLowerCase().includes(query)
            ));
    }

    const _getAllVisitationLogs = async (allowToast) => {
        try {
            let exports = []
            const visitationLogs = await getAllPositiveLogs();
            setContactLogs(visitationLogs.data?.data);
            for(let i = 0; i < visitationLogs.data.data.length; i++) {
                let exportableData = {
                    firstName: visitationLogs.data.data[i].firstName,
                    middleName: visitationLogs.data.data[i].middleName,
                    lastName: visitationLogs.data.data[i].lastName,
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
        console.log(id)
        setShowTracerModal(true);
        try {
            const closeContacts = await getAllCloseContact(id);
            const visitationHistroy = await getAllInfectedVisitationHistroy(id);
            const filteredCloseContacts = closeContacts.data.data.filter((positive) => { return positive.userId.mobileNumber !== id })
            setCloseContactData(filteredCloseContacts);
            setVisitationHistoryData(visitationHistroy.data?.data)
            // filter the data requested for editing
            const filterdData = positiveLogs.filter((positive) => { return positive.mobileNumber === id })  
            setDataToBeView(filterdData[0])
        } catch (error) {
            console.log(error)
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
                                onClick={() => { JSONToCSVConvertor(exportableDataState, "Positive Contact", true)}} 
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