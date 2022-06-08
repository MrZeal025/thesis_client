import React, { useRef, useState } from 'react'
// import css
import './userhome.css'
// import utilities
import UserHomeNav from './utilities/UserHomeNav'
// import package/s
import Helmet from 'react-helmet'
import axios from 'axios';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save'
import { saveAs } from "file-saver"

const UserHome = () => {
    
    const [isDownloading, setIsDownloading] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const cancelTokenSource = useRef();

    // ADD this function on onClick of download Button
    const downloadApp =  () => {
        
        setIsDownloading(true)
        let progress = 0;
        cancelTokenSource.current = axios.CancelToken.source();

        axios({
            url: "https://juanbreath-server.herokuapp.com/api/app/download",
            onDownloadProgress(progressEvent){
                progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setPercentage(progress);
            },
            cancelToken: cancelTokenSource.current.token,
            method: "GET",
            responseType: "blob"
        }).then((res) => {
            setIsDownloading(false);
            // prepare the data to a blob file
            const blob = new Blob([res.data], { type: "octet-stream"})
            saveAs(blob, "JuanBreath.apk");
            
        }).catch((err) => {
            setIsDownloading(false)
        })
    }

    const cancelDownload = () => {
        cancelTokenSource.current.cancel();
    }

    return (
        <div className='userHomeWrapper'>
            {/* Helmet for page's title*/}
            <Helmet>
                <title>JuanBreath - Contact Tracing App</title>
            </Helmet>
            <UserHomeNav />
            <div className='userHomeBody'>
                <div className='userHomeCont'>
                    <div className='userHomeTexts'>
                        <h1>Your privacy is not sacrificed to ensure your safety.</h1>
                        <h6>
                        <b>JuanBreath</b> is a contact tracing app developed to help the nation 
                        from the adverse effects on the spread the virus.
                        </h6>
                        { !isDownloading &&  
                            <Button className='accentBtn downloadAppBtn' onClick={() => {downloadApp()}} variant="contained">
                                <DownloadIcon/> Download JuanBreath Mobile App
                            </Button>
                        }
                        {
                            isDownloading && 
                            <div>
                                <LoadingButton
                                    loading
                                    loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                    className='accentBtn downloadAppBtn'
                                    variant="contained"
                                >
                                    Downloading Inprogress : {percentage}%
                                </LoadingButton>
                                <Button onClick={() => {cancelDownload()}} style={{ marginLeft: "10px", height: "40px" }} variant="contained" color="error">
                                    Cancel
                                </Button>
                            </div>
                        }
                        
                    </div>
                    <div className='userHomeIllustration'>
                    </div>
                </div>
            </div>
            <footer className='userHomeFooter'>
                <p> JuanBreath © 2022 | <a href='/'> Terms and Conditions</a></p>
            </footer>
        </div>
    )
}

export default UserHome