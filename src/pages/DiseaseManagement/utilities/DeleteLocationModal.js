import React from 'react';
// import package/s
import { Row } from 'react-bootstrap'
import FormDialog from '../../../components/DialogModal';

const DeleteLocationModal = ({ showFunction, onHideFunction, data, submitDeleteMethod }) => {
    return (
        <>
            <FormDialog 
                show={showFunction} 
                handleClose={onHideFunction}
                buttonName="Delete"
                onSubmit={submitDeleteMethod}
                maxWidth="sm"
                dialogTitle="Delete Traced Disease"
            >
                <Row className="mt-4">
                    <p>
                        If you confirm the deletion of <b className='deleteLocationName'>{data}</b>,
                        all logs and data will be deleted from the system and can no longer be retrieved.
                    </p>                    
                </Row>
            </FormDialog>
        </>
    );
};

export default DeleteLocationModal;
