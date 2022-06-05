import React, { useState } from 'react'
// import from backend
import { loginAdmin } from "../../services/auth/login";
// import css
import './login.css'
// import logo
import {Link} from "react-router-dom"
import logo from '../../media/logo-White.png'
// import package/s
import { useForm } from 'react-hook-form'
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import jwt_decode from 'jwt-decode';
import { checkAccess } from '../../services/auth/login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save'
import { Button } from '@mui/material';

const Login = () => {

    const { register, handleSubmit, formState: {errors} } = useForm(); 
    const [viewPassword, setViewPassword] = useState(false)   
    const [validationError, setErrors] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // this will provide the users current page location
    const onSubmit = async (usersCredentials) => {
        try {
            setIsSubmitting(!isSubmitting)
            const { data } = await loginAdmin(usersCredentials);
            // check if ther are response from the data
            if(data.success) {
                // set the generated token to the local storage
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                const decodedToken = jwt_decode(data.accessToken)
                check(decodedToken.role)
            }

        } catch (error) {
            if(error.response?.status === 400) {
                setIsSubmitting(false)
                setErrors(error.response.data?.message)
            }
        }
    }

    const passwordToggleBtn = () => {
        setViewPassword(prevState => !prevState)
    }

    const check =  async (role) => {
        try {
            let permissionNames = []
            const data = await checkAccess(role)
            const permissions = data.data?.data[0].permissions;

            for(let i = 0; i < permissions.length; i++) {
                permissionNames.push(permissions[i].name)
            }

            if(permissionNames.includes("Dashboard:Read")) {
                window.location.href = "/dashboard"
            }
            else if(permissionNames.includes("Location:Read")) {
                window.location.href = "/locations"
            }
            else if(permissionNames.includes("Disease:Read")) {
                window.location.href = "/diseases"
            }
            else if (permissionNames.includes("Visitation-History:Read")){
                window.location.href = "/visitation-logs"
            }
            else if(permissionNames.includes("Contact-Tracing-Logs:Read")) {
                window.location.href = "/positive-tracing-logs"

            }
            else if(permissionNames.includes("Users:Read")) {
                window.location.href = "/user-management"
            }
            else if(permissionNames.includes("Admin:Read")) {
                window.location.href = "/admin-management"
            }
            else if(permissionNames.includes("Role:Read")) {
                window.location.href = "/roles-and-permissions"
            }

        } catch (error) {
            // do something
        }
    }

    return (
        <div className='logincontainer'>
            <div className='loginNav'>
                <div style={{ display: "flex"}}>
                    <img src={logo} alt='logo' height={50} width={50}/>
                    <div className='loginNavTitleCont' onClick={() => { window.location.href = "/" }}>
                        <p className='loginNavTitle1'>JuanBreath</p> 
                        <p className='loginNavTitle2'>ADMIN</p>
                    </div>
                </div>
                <div className='signInLinkDiv'>
                    <Link to='/' className='signInLink'><ArrowBackIcon fontSize='12' /> Go Back</Link>
                </div>
            </div>
            <div className='wrapper'>
                <div className='loginForm'>
                    <h3 className='loginFormTitle'>SIGN IN</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Username</label>
                            <input 
                                type='text' 
                                className='inputStyle'
                                autoFocus
                                {...register('username', {required: true})}
                            />
                            <p className='inputErrorMessage'>{errors.username?.type === 'required' && "Username is required."}</p>
                        </div>
                        <div>
                            <label>Password</label>
                            <div className='passwordInputGrp'>
                                <input 
                                    type={viewPassword ? 'text' : 'password'}
                                    className='inputPasswordStyle'
                                    {...register('password', {required: true})}
                                />
                                <div className='eyeIconBtn' onClick={passwordToggleBtn}>
                                    {viewPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </div>
                            </div>
                            <p className='inputErrorMessage'>{(errors.password?.type === 'required' && "Password is required.") || validationError}</p>
                        </div>
                        <div className='mb-10'>
                            <a className='forgotPassLink' href='forgot-password'>Forgot Password?</a>
                        </div>
                        {
                            isSubmitting ? 
                                <LoadingButton
                                    loading
                                    loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                    variant="contained"
                                >
                                    Signing Up
                                </LoadingButton>
                            :   <Button type='submit' className='primaryBlockBtn' variant='contained'>Sign In</Button>
                        }
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default Login