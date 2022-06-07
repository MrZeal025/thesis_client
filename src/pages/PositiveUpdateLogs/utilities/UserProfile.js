import React from 'react'
// import package/s
import { Form } from 'react-bootstrap'

const PositiveUserProfile = ({ data }) => {
    
  return (
    <>
        <div className='content-center-modal'>
            <Form.Text>
                This form only contains information uploaded by the infected user.
                All information are strictly confidential.
            </Form.Text>
            <div className='mt-3'>
                <h3>User Profile</h3>
                <Form.Group className="mb-2 mt-2 d-flex" controlId="formBasicEmail">
                    <div className='form-inline-display'>
                        <Form.Label>User Affiliation</Form.Label>
                        <Form.Control 
                            type="text"
                            value={data.userType} 
                            readOnly
                            required
                        />
                    </div>
                </Form.Group>
            </div>
            <div className='mt-3'>
                <h4>Basic Information</h4>
                <Form.Group className="mb-2 mt-2 d-flex" controlId="formBasicEmail">
                    <div className='form-inline-display'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.firstName}  
                            readOnly
                            required
                        />
                    </div>
                    <div className='form-inline-display'>
                        <Form.Label>Middle Name </Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.middleName}  
                            readOnly
                            required
                        />
                    </div>
                    <div className='form-inline-display'>
                        <Form.Label>Last Name </Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.lastName}  
                            readOnly
                            required
                        />
                    </div>
                    <div className='form-inline-display small-input'>
                        <Form.Label>Suffix </Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.nameExtension} 
                            readOnly 
                            required
                        />
                    </div>
                </Form.Group>
            </div>
            <div className='mt-3'>
                <h4>Address</h4>
                <Form.Group className="mb-2 mt-2 d-flex" controlId="formBasicEmail">
                    <div className='form-inline-display'>
                        <Form.Label>Lot Number</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.lotNumber} 
                            readOnly
                            required
                        />
                    </div>
                    <div className='form-inline-display'>
                        <Form.Label>Street Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.streetName} 
                            readOnly
                            required
                        />
                    </div>
                </Form.Group>
                <Form.Group className="mb-2 mt-2 d-flex" controlId="formBasicEmail">
                    <div className='form-inline-display'>
                        <Form.Label>District/Subdivision</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.disctrict} 
                            readOnly
                            required
                        />
                    </div>
                    <div className='form-inline-display'>
                        <Form.Label>Barangay</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.barangay} 
                            readOnly
                            required
                        />
                    </div>
                </Form.Group>
                <Form.Group className="mb-2 mt-2 d-flex" controlId="formBasicEmail">
                    <div className='form-inline-display'>
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.city} 
                            readOnly
                            required
                        />
                    </div>
                    <div className='form-inline-display'>
                        <Form.Label>Province</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.province} 
                            readOnly
                            required
                        />
                    </div>
                </Form.Group>
            </div>
            <div className='mt-3'>
                <h4>Contact Number</h4>
                <Form.Group className="mb-2 mt-2 d-flex" controlId="formBasicEmail">
                    <div className='custom-width'>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={data.mobileNumber} 
                            readOnly
                            required
                        />
                    </div>
                </Form.Group>
            </div>
        </div>
    </>
    );
  }
  
export default PositiveUserProfile;