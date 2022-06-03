import React, {useState} from 'react'
// import css
import './CustomModals.css'
// import package/s
import { Button } from '@mui/material'
import { Modal, Form } from 'react-bootstrap'

const AddLocationModal = ({ method }) => {
    
  const [name, setLocationName] = useState('');
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = () => {
    // create new instance of location for sending

    const locationSchema = {
        name: name
      };
      // pass the data to the method provided
      method(locationSchema);

      // close the modal
      setShow(false);
  }
  return (
    <>
      <Button className='primaryBtn' onClick={handleShow} variant="contained">Trace New Disease</Button>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header className='modal-header-bg' closeButton >
              <Modal.Title className='addModalTitle wide-modal-title'>Trace New Disease</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className='content-center-modal'>
                  <Form.Text>
                      This form will let you add a new disease variant to the system.
                  </Form.Text>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Disease Name <b className='text-danger'>*</b></Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter name" 
                      onChange={e => setLocationName(e.target.value)} 
                      required
                    />
                  </Form.Group>
                  <div className='full-page-modal-save-button'>
                    <button className='primaryBlockBtn' onClick={() => onSubmit()}>Trace</button>
                  </div>
              </div>
          </Modal.Body>
          
      </Modal>
    </>
    );
  }
  
export default AddLocationModal;