import React, {useState} from 'react'
// import css
import './CustomModals.css'
// import package/s
import { Button } from '@mui/material'
import { Form, Row } from 'react-bootstrap'
import { FormError } from '../../../components/ErrorDisplay/FormError';
import FormDialog from '../../../components/DialogModal';

const AddLocationModal = ({ method, errorMsg }) => {
    
  const [name, setLocationName] = useState('');
  const [address, setLocationAddress] = useState('');
  const [officerInCharge, setOfficerInCharge] = useState('');
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = async () => {
    // create new instance of location for sending

    const locationSchema = {
        name: name,
        address: address,
        officerInCharge: officerInCharge
      };
      // pass the data to the method provided
      const pass = await method(locationSchema);
      // close the modal
      pass && setShow(false);
  }
  return (
    <>
      <Button className='primaryBtn' onClick={handleShow} variant="contained">Add Location</Button>
      <FormDialog 
        show={show} 
        handleClose={handleClose} 
        onSubmit={onSubmit}
        maxWidth={"lg"}
        buttonName="Create Location"
        dialogTitle="Create Location"
        dialogDescription1="This form will let you add a new location to the system."
        dialogDescription2="Please fill in the details for the new location."
      >
        <Row className='mt-4'>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Location Name <b className='text-danger'>*</b></Form.Label>
            <Form.Control 
              type="text" 
              onChange={e => setLocationName(e.target.value)} 
              required
            />
            <FormError
              errorMessages={errorMsg}
              field="name"
              replaceControl="Location name"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Location Address <b className='text-danger'>*</b></Form.Label>
            <Form.Control 
              type="text" 
              onChange={e => setLocationAddress(e.target.value)} 
              required
            />
            <FormError
              errorMessages={errorMsg}
              field="address"
              replaceControl="Address"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Officer in Charge <b className='text-danger'>*</b></Form.Label>
            <Form.Control 
              type="text" 
              onChange={e => setOfficerInCharge(e.target.value)} 
              required
            />
            <FormError
              errorMessages={errorMsg}
              field="officerInCharge"
              replaceControl="Officer in Charge"
            />
          </Form.Group>
        </Row>
      </FormDialog>
    </>
    );
  }
  
export default AddLocationModal;