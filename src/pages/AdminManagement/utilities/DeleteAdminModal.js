import React from 'react';
// import css
import './CustomModals.css'
// import package/s
import FormDialog from '../../../components/DialogModal';

const DeleteAdminModal = ({ showFunction, onHideFunction, data, submitDeleteMethod}) => {
    return (
        <>
            <FormDialog 
                show={showFunction} 
                handleClose={onHideFunction} 
                onSubmit={submitDeleteMethod}
                maxWidth={"sm"}
                buttonName="Proceed"
                dialogTitle="Delete Administrator Account"
            >
                <p>
                    If you proceed to delete <b className='deleteLocationName'>{data}</b>,
                    their account will no longer exist in the system and this can not be undone.
                </p>                        
            </FormDialog>
        </>
    );
};

export default DeleteAdminModal;
