import React from 'react'
// import package/s
import { Row, Form } from 'react-bootstrap'
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
                dialogDescription1="This form will let you update the disease information."
                dialogTitle="Update Information"
            >
                <Row className='mt-4'>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Disease Name <b className='text-danger'>*</b></Form.Label>
                        <Form.Control 
                            type="text"
                            value={data?.name}
                            onChange={e => dataEditMethod(e.target.value, 'name')}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row className='mt-4'>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Tracing Color</Form.Label>
                        <Form.Control 
                            type="color"
                            value={data?.color}
                            onChange={e => dataEditMethod(e.target.value, 'color')}
                            required
                        />
                    </Form.Group>
                </Row>
            </FormDialog>
        </>
    );
};

export default EditLocationModal;
