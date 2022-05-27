import * as React from 'react';
import { Button } from '@mui/material';
import { FaSync } from 'react-icons/fa';

export default function Refresh({ onRefresh }) {
    return (
        <>
            <Button 
                style={{ 
                    marginRight: "10px", 
                    height: "40px",
                    width: "fit-content"
                }}  
                variant="outlined"
                onClick={() => { onRefresh(true)}}
            >
                <FaSync style={{ marginRight: "5px"}}/> Refresh
            </Button>
        </>
    );
}
