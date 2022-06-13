import React, { useState } from 'react'
// component/s
import { Button } from '@mui/material'
import { Form } from 'react-bootstrap'
import BasicTable from '../../../components/BasicTable'
import { CloseContactCOLUMNS } from '../../../components/BasicTable/columns'
import ToastNotification from '../../../components/Toast'
// apis
import { alertAllCloseContacts } from '../../../services/positive-update-logs/get'

const CloseContactTable = ({ data, infectedPersonData }) => {

  const [showToast, setShowToast] = useState(false);
  const [toastStatue, setToastStatus] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const alertCloseContacts = async () => {
    const mobileNumbers = []

    for(let i = 0; i < data.length; i++) {
      mobileNumbers.push(data[i].userId.mobileNumber)
    }
    try {
      const data = await alertAllCloseContacts({
        disease: infectedPersonData.disease,
        mobileNumbers: mobileNumbers
      });

      if(data.data.success){
        setShowToast(!showToast);
        setToastMessage("Alerted close contacts message successfully sent!");
        setToastStatus('Success');
      }
    } catch (error) {
      setShowToast(!showToast);
      setToastMessage("Failed in alerting close contacts.");
      setToastStatus('Error');
    }
  }
    
  return (
    <div className='content-center-modal'>
      <div className='filterandReportGrp'>
          <Button 
            variant="contained" 
            className='primaryBtn' 
            onClick={() => {alertCloseContacts()}}
          >
            Alert All Close Contacts
          </Button>
      </div>
      <Form.Text>
          This table shows the list possible close contacts of the infected individual based on the date and time the matches on the same location. 
      </Form.Text>
      <BasicTable 
        columnHeads = {CloseContactCOLUMNS}
        tableData = {data}
        />
      <ToastNotification
        showToast={showToast}
        setShowToast={setShowToast}
        message={toastMessage}
        status={toastStatue}
      />
    </div>
    );
  }
  
export default CloseContactTable;