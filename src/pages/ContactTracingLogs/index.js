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
import { getAllLocations } from '../../services/locations/get.js';

const ContactTracingLogs = () => {

    const [contactLogs, setContactLogs] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    const _getAllVisitationLogs = async () => {
        try {
            const visitationLogs = await getAllVisitationLogs();
            setContactLogs(visitationLogs.data?.data);
            setIsFetching(false);
        } catch (error) { 
            setContactLogs([]);
        }
    }

    const _getAllLocation = async () => {
        try {
            const locations = await getAllLocations();
            setLocations(locations.data?.data);
        } catch (error) {
            setLocations([]);
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

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

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
        _getAllLocation();
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
                <h4>Filters</h4>
                <div className='filterandReportGrp'>
                    <div className='filterInputWrapper mb-10'>
                        <select className='inputStyle2 mr-10'>
                            <option value={"Anywhere"}>Anywhere</option>
                            {
                                locations.map((location, i) => {
                                    return <option key={i} value={location.name}>{location.name}</option>
                                })
                            }
                        </select>
                        <input type="date" className='inputStyle2 mr-10'/>
                    </div>
                    {/* Generate Report Button */}
                    <button onClick={() => { JSONToCSVConvertor(contactLogs, "Visitation Histories", true)}} className='primaryBtn genReportBtn'>Export CSV</button>
                </div>
                <BasicTable 
                    columnHeads = {LogsCOLUMN}
                    tableData = {contactLogs}
                    hasDelete={false}
                    hasEdit={false}
                    hasQR={false}
                    isFetching={isFetching}
                />
            </div>
        </HomeContainer>
        
    )
}

export default ContactTracingLogs