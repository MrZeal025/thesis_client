import React from 'react';
import { Form, Col, Row } from 'react-bootstrap'
import { FormError } from '../../../components/ErrorDisplay/FormError';
import FormDialog from '../../../components/DialogModal';

const EditAdminModal = ({showFunction, onHideFunction, dataEditMethod, roles, errorMsg, locations, submitEditMethod, data}) => {
    return (
        <>
            <FormDialog 
                show={showFunction} 
                handleClose={onHideFunction}
                onSubmit={submitEditMethod}
                buttonName="Update Changes"
                maxWidth="lg"  
                dialogTitle="Update Administrator's Account"
            >
                <div className='content-center-modal'>
                    <Row className='mt-4'>
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>First Name <b className='text-danger'>*</b></Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={data?.firstName}
                                    onChange={e => dataEditMethod(e.target.value, 'firstName')}
                                    required
                                />
                                <FormError
                                    errorMessages={errorMsg}
                                    field="lastName"
                                    replaceControl="Last name"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={data?.middleName}
                                    onChange={e => dataEditMethod(e.target.value, 'middleName')}
                                />
                                <FormError
                                    errorMessages={errorMsg}
                                    field="middleName"
                                    replaceControl="Middle name"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Last Name <b className='text-danger'>*</b></Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={data?.lastName}
                                    onChange={e => dataEditMethod(e.target.value, 'lastName')}
                                    required
                                />
                                <FormError
                                    errorMessages={errorMsg}
                                    field="lastName"
                                    replaceControl="Last name"
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={'auto'}>
                            <Form.Group className="mb-2 small-input" controlId="formBasicEmail">
                                <Form.Label>Suffix</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={data?.suffix}
                                    onChange={e => dataEditMethod(e.target.value, 'suffix')}
                                />
                                <FormError
                                    errorMessages={errorMsg}
                                    field="suffix"
                                    replaceControl="Suffix"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Username <b className='text-danger'>*</b></Form.Label>
                        <Form.Control 
                            type="text"
                            value={data?.username}
                            onChange={e => dataEditMethod(e.target.value, 'username')}
                            required
                        />
                        <FormError
                            errorMessages={errorMsg}
                            field="username"
                            replaceControl="Username"
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Email <b className='text-danger'>*</b></Form.Label>
                        <Form.Control 
                            type="email"
                            value={data?.email}
                            onChange={e => dataEditMethod(e.target.value, 'email')}
                            required
                        />
                        <FormError
                            errorMessages={errorMsg}
                            field="email"
                            replaceControl="Email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Location Assigned <b className='text-danger'>*</b></Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => dataEditMethod(e.target.value, 'locationAssigned')}>
                            <option selected disabled>{data?.locationAssigned}</option>
                            {
                                locations?.map((location, i) => {
                                    return (<option key={i} value={location.name}>{location.name}</option>)
                                })
                            }
                        </Form.Select>
                        <FormError
                            errorMessages={errorMsg}
                            field="locationASsigned"
                            replaceControl="Location Assigned"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Role <b className='text-danger'>*</b></Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => dataEditMethod(e.target.value, 'role')}>
                            <option selected disabled>{data?.role}</option>
                            {
                                roles?.map((role, i) => {
                                    return (<option key={i} value={role.name}>{role.name}</option>)
                                })
                            }
                        </Form.Select>
                        <FormError
                            errorMessages={errorMsg}
                            field="role"
                            replaceControl="Role"
                        />
                    </Form.Group>
                </div>             
            </FormDialog>
        </>
    );
};

export default EditAdminModal;
