import React from 'react';
import './routes.css'
import ErrorArt from '../media/404Error.svg'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';


export default function NotFoundRoute() {
  const navigate = useNavigate();
  return (
    <div className='page-not-found-cont'>
      <img src={ErrorArt} className='error-art' alt='404 Error Page Not Found'/>
      <h2>Error 404 Page Not found</h2>
      <p>Return to the previous page.</p>
      <Button onClick={() => { navigate(-1)}}  className='primaryBtn' variant="contained">Go Back</Button>
    </div>
  )
}
