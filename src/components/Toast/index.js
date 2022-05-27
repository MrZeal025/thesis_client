import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const  ToastNotification = ({ message, status, showToast, setShowToast })  => {
  return (
    <>
         <Snackbar open={showToast} autoHideDuration={2500} onClose={() => setShowToast(!showToast)}  anchorOrigin={{ vertical : "bottom", horizontal: "right" }}>
          <Alert onClose={() => setShowToast(!showToast)} severity={status.toLowerCase()} sx={{ width: '100%' }}>
            { message ? message : '' }
          </Alert>
        </Snackbar>
    </>
  );
}

export default ToastNotification;