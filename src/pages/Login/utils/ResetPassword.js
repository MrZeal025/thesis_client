import React from 'react';
import { Form, Col, Row } from 'react-bootstrap'
import { FormError } from '../../../components/ErrorDisplay/FormError';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save'

const ResetPassword = ({ 
    showFunction, 
    onHideFunction, 
    errorMsg, 
    currentPassword, 
    newPassword, 
    confirmNewPassword, 
    setCurrentPassword, 
    setNewPassword, 
    setConfirmNewPassword,
    showNextStep,
    handleConfirmCurrentPassword,
    isSubmitting,
    resetPasswordFunction 
}) => {
    return (
        <>
            <Dialog 
                open={showFunction} 
                maxWidth="lg"
                onClose={onHideFunction} 
            >
                <DialogTitle style={{ color: "#2a749f", fontWeight: "bold", fontSize: "25px"}}>Reset Password Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>You will be logged out after changing the password.</DialogContentText>
                    {
                        !showNextStep && 
                        <Row className='mt-4'>
                            <Col>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Enter Current Password <b className='text-danger'>*</b></Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={currentPassword}
                                        onChange={e => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <FormError
                                        errorMessages={errorMsg}
                                        field="password"
                                        replaceControl="Password"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    }
                    {
                        showNextStep &&  <Row className='mt-4'>
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Enter New Password <b className='text-danger'>*</b></Form.Label>
                                <Form.Control 
                                    type="password" 
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    required
                                />
                                <FormError
                                    errorMessages={errorMsg}
                                    field="newPassword"
                                    replaceControl="New Password"
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Confirm New Password <b className='text-danger'>*</b></Form.Label>
                                <Form.Control 
                                    type="password" 
                                    value={confirmNewPassword}
                                    onChange={e => setConfirmNewPassword(e.target.value)}
                                    required
                                />
                                <FormError
                                    errorMessages={errorMsg}
                                    field="confirmNewPassword"
                                    replaceControl="Confirmation Password"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    }
                </DialogContent>
                <DialogActions style={{ marginBottom: "10px", marginRight: "12px"}}>
                    {
                        !showNextStep && 
                        <>
                            <Button onClick={() => {onHideFunction()}} style={{ color: "red"}}>Cancel</Button>
                            
                                {
                                    isSubmitting ? 
                                        <LoadingButton
                                            loading
                                            loadingPosition="start"
                                            startIcon={<SaveIcon />}
                                            variant="contained"
                                        >
                                            Verifying
                                        </LoadingButton>
                                    :   <Button className='primaryBlockBtn' onClick={() => handleConfirmCurrentPassword()} variant="contained">Confirm</Button>
                                }
                        </>
                    }
                    {
                        showNextStep && <>
                            {
                                isSubmitting ? 
                                    <LoadingButton
                                            loading
                                            loadingPosition="start"
                                            startIcon={<SaveIcon />}
                                            variant="contained"
                                        >
                                        Updating
                                    </LoadingButton>
                                :   <Button  className='primaryBlockBtn' onClick={() => resetPasswordFunction()} variant="contained">Update Password</Button>
                            }
                        </>
                        
                    }
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ResetPassword;
