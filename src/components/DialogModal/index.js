import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
    const { 
        show, 
        handleClose, 
        dialogTitle, 
        dialogDescription1, 
        dialogDescription2, 
        maxWidth, 
        onSubmit,
        buttonName
    } = props
    return (
        <Dialog open={show} onClose={handleClose} maxWidth={maxWidth}>
            <DialogTitle style={{ color: "#2a749f", fontWeight: "bold", fontSize: "25px"}}>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogDescription1}</DialogContentText>
                <DialogContentText>{dialogDescription2}</DialogContentText>
                { props.children }
            </DialogContent>
            <DialogActions style={{ marginBottom: "10px", marginRight: "12px"}}>
                <Button onClick={handleClose} style={{ color: "red"}}>Cancel</Button>
                <Button onClick={() => { onSubmit() }} className='primaryBlockBtn' variant="contained">{buttonName}</Button>
            </DialogActions>
        </Dialog>
    );
}
