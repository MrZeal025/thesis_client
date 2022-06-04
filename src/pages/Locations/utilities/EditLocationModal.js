import React from 'react'
// import css
import './CustomModals.css'
// import package/s
import { Form, Row } from 'react-bootstrap'
import FormDialog from '../../../components/DialogModal';

const EditLocationModal = ({ showFunction, onHideFunction, data, dataEditMethod, submitEditMethod }) => {

    return (
        <>
            <FormDialog 
                show={showFunction} 
                handleClose={onHideFunction} 
                onSubmit={submitEditMethod}
                maxWidth={"lg"}
                buttonName="Update Changes"
                dialogTitle="Update Location"
                dialogDescription1="This form will let you update location information."
            >
                <Row className='mt-4'>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Name <b className='text-danger'>*</b></Form.Label>
                        <Form.Control 
                            type="text"
                            value={data?.name}
                            onChange={e => dataEditMethod(e.target.value, 'name')}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Location Address <b className='text-danger'>*</b></Form.Label>
                        <Form.Control 
                            type="text"
                            value={data?.address}
                            onChange={e => dataEditMethod(e.target.value, 'address')}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Officer in Charge <b className='text-danger'>*</b></Form.Label>
                        <Form.Control 
                            type="text"
                            value={data?.officerInCharge} 
                            onChange={e => dataEditMethod(e.target.value, 'officerInCharge')}
                            required
                        />
                    </Form.Group>
                </Row>
            </FormDialog>
        </>
    );
};

export default EditLocationModal;
