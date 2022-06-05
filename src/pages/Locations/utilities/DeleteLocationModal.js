import React from 'react';
// import css
import './CustomModals.css'
// import package/s
import FormDialog from '../../../components/DialogModal';

const DeleteLocationModal = ({ showFunction, onHideFunction, data, submitDeleteMethod }) => {
    return (
        <>
            <FormDialog 
                show={showFunction} 
                handleClose={onHideFunction}
                onSubmit={submitDeleteMethod}
                buttonName="Delete Location"
                maxWidth={"sm"}
                dialogTitle="Confirm to Delete"
            >
                <p>
                    If you confirm the deletion of <b className='deleteLocationName'>{data}</b>,
                    all logs and data will be deleted from the system and can no longer be retrieved.
                </p>
            </FormDialog>
        </>
    );
};

export default DeleteLocationModal;
