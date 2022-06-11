import React, {useState} from 'react'
// import package/s
import { Button } from '@mui/material'
import { Row, Form } from 'react-bootstrap'
import FormDialog from '../../../components/DialogModal';

const AddLocationModal = ({ method }) => {
    
  const [name, setLocationName] = useState('');
  const [color, setColor] = useState('');
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = () => {
    // create new instance of location for sending

    const locationSchema = {
        name: name,
        color: color
      };
      // pass the data to the method provided
      method(locationSchema);
      // close the modal
      setShow(false);
  }
  return (
    <>
      <Button className='primaryBtn' onClick={handleShow} variant="contained">Trace New Disease</Button>
      <FormDialog 
        show={show} 
        handleClose={handleClose} 
        onSubmit={onSubmit}
        buttonName="Trace"
        dialogTitle="Trace New Disease"
        dialogDescription1="This form will let you add a new disease variant to the system."
      >
        <Row className="mt-4">
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Disease Name <b className='text-danger'>*</b></Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter name" 
              onChange={e => setLocationName(e.target.value)} 
              required
            />
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Tracing Color</Form.Label>
            <Form.Control 
              type="color" 
              onChange={e => setColor(e.target.value)} 
              required
            />
          </Form.Group>
        </Row>
          
      </FormDialog>
    </>
    );
  }
  
export default AddLocationModal;