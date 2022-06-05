import React, { useState } from 'react'
// import css
import '../Login/login.css'
// import logo
import logo from '../../media/logo-White.png'
// import package
import { Helmet } from 'react-helmet'
import { forgotPassword } from '../../services/auth/forgotpassword'
import Spinner from 'react-bootstrap/Spinner'
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save'

const ForgotPassword = () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setErrors] = useState('');
  const [email, setEmail] = useState('')

  const onSubmit = async () => {

    try {
      setIsSubmitting(!isSubmitting)
      await forgotPassword({ email: email });
      // if the api passes
      const generatedAccessKey = Math.random().toString(36);
      window.localStorage.setItem('shortlivekey', generatedAccessKey)
      window.location.href=`${generatedAccessKey}/forgot-password-notification`
    } 
    catch (error) {
      if(error.response?.status === 400) {
        setIsSubmitting(false)
        setErrors(error.response.data?.message)
      }
    }
  }

  return (
    <div className='logincontainer'>
        <Helmet>
          <title>JuanBreath | Forgot Password</title>
        </Helmet>
        <div className='loginNav flex-between'>
            <div className='flex-row'>
                <img src={logo} alt='logo' height={50} width={50}/>
                <div className='loginNavTitleCont'>
                    <p className='loginNavTitle1'>JuanBreath</p> 
                    <p className='loginNavTitle2'>ADMIN</p>
                </div>
            </div>
            <div className='signInLinkDiv'>
                <a href='/login' className='signInLink'>Sign In</a>
            </div>
        </div>
        <div className='wrapper'>
          {/* Forgot Password Form */}
            <div className='forgotPassForm'>
                <h3 className='loginFormTitle'>Forgot Password</h3>
                <p className='tableCaption'>
                  Please put in the email address that is registered
                  on your admin account to reset the password. Instructions  
                  will be sent to your email address.
                </p>
                <form>
                  <div>
                    <label>Email Address</label>
                      <input 
                          type='email' 
                          className='inputStyle'
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          autoFocus
                          required
                      />
                      <p style={{
                        marginTop: "3px",
                        marginBottom: "10px",
                        fontSize: "12px",
                        color:"red"
                      }}>{validationError.replace('"email"', "Email")}</p>
                  </div>
                  {
                      isSubmitting ? 
                          <LoadingButton
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                          >
                            Sending
                          </LoadingButton>
                      :   <Button variant='contained'  className='primaryBlockBtn' onClick={() => onSubmit()}>Continue</Button>
                  }
              </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword