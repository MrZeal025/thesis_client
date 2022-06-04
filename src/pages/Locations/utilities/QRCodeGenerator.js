import React from 'react'
// import css
import './CustomModals.css'
import logo from "../../../media/logo-White.png"
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import DownloadIcon from '@mui/icons-material/Download';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QRCodeGeneratorModal = ({ showFunction, onHideFunction, data, qrCodelocationName }) => {

    return (
        <>
            <Dialog
                fullScreen 
                open={showFunction} 
                onClose={onHideFunction} 
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: "#2a749f"}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onHideFunction}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Generated QR Code
                        </Typography>
                        <Typography 
                            style={{ 
                                backgroundColor: "#d9e1e9", 
                                padding: "6px", 
                                borderRadius: "3px",
                                outline: "none"
                            }} 
                            variant="p" 
                            component="div"
                        >
                            <a 
                                href={qrCodelocationName} 
                                className='qr-download-modal-item' 
                                download
                            >
                                <DownloadIcon/> Save QR Code as Image
                            </a>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className='item-center-modal'>
                    <div className='qr-container'>
                        <div>
                            <div className='qr-code-title d-flex justify-content-center'>
                                <img src={logo} alt='logo' height={40}/>
                                <h2>JuanBreath</h2> 
                            </div>
                            <div className='d-flex justify-content-center mt-1'>
                                <div className='line'></div>
                            </div>
                            <div className='qr-code-title'>
                                <h4>QR Code Location</h4>
                            </div> 
                        </div>
                        <div className='qr-code-title'>
                            <h1>{data?.name.toUpperCase()}</h1>
                        </div>
                        <div className='qr-code-content-container'>
                            <div className='qr-content'>
                                <img src={qrCodelocationName} className="QRImg" alt="QR Code Holder" />
                            </div>
                        </div>
                    </div>
                </div>                
            </Dialog>
        </>
    );
};

export default QRCodeGeneratorModal;
