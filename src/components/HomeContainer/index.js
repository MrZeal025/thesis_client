import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import HomeNav from '../HomeNav';
import ResetPassword from '../../pages/Login/utils/ResetPassword';
// services
import { loginAdmin } from '../../services/auth/login';
import { resetPassword } from '../../services/auth/resetpassword';
import ToastNotification from '../Toast';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Sidebar from '../SideBar';
import { checkAccess } from '../../services/auth/login';

const drawerWidth = 270;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function HomeContainer (props) {
  
  const [open, setOpen] = useState(true);
  const [accessList, setAccess] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // set up password and new password variables
  const [userName, setUserName] = useState('');
  const [showNextStep, setShowNextStep] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState([])
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // toast notification
  const [showToast, setShowToast] = useState(false);
  const [toastStatue, setToastStatus] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // modal show and hide
  const handleCloseShowResetModal = () => {
    setShowResetModal(false);
    setNewPassword('')
    setConfirmNewPassword('')
    setCurrentPassword('')
    setErrorMsg([])
    setIsSubmitting(false)
    setShowNextStep(false);
  }

  // confirm current password 
  const handleConfirmCurrentPassword = async () => {
    setIsSubmitting(!isSubmitting)
    try {
      const { data } = await loginAdmin({ username: userName, password: currentPassword });
      if(data.success) {
        setShowNextStep(!showNextStep)
        setErrorMsg([]);
        setIsSubmitting(false)
      }
    } catch (error) {
      setIsSubmitting(false)
      if(error.response?.status === 400) {
        setErrorMsg([error.response.data?.message])
      }
    }
  }

  // reset method endpoint
  const resetPasswordFunction = async () => {
    setIsSubmitting(!isSubmitting)
    try {
      const data = await resetPassword({ username: userName, password: currentPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword });
      if(data.data.success) {
        handleCloseShowResetModal()
        setErrorMsg([]);
        setIsSubmitting(false);
        setShowToast(!showToast);
        setToastMessage("Admin password has been updated successfully.");
        setToastStatus('Success');
      }
      // execiute after 3 seconds
      setTimeout(()=> {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href ="/"
      }, 3000)
      
    } catch (error) {
      setIsSubmitting(false)
      if(error.response?.status === 400) {
        setErrorMsg(error.response.data?.message.split('.'))
      }
    }
  }

  const check =  async (role) => {
    try {
        let permissionNames = []
        const data = await checkAccess(role)
        const permissions = data.data?.data[0].permissions;

        for(let i = 0; i < permissions.length; i++) {
            permissionNames.push(permissions[i].name)
        }
        setAccess(permissionNames)
    } catch (error) {
        setAccess([])
    }
  }

  useEffect(() => {
    try {
      // get the local token, decode and reuse the users user name as navbar header
      const token = localStorage.getItem('accessToken');
      const decodedToken = token ? jwtDecode(token) : null
      
      if(decodedToken) {
        setUserName(decodedToken.username)
        check(decodedToken.role)
      }
    } catch (error) {
        setUserName('JuanBreath Admin')   
    }
  },[]);

  // add toast notif
  return (
    <Box sx={{ display: 'flex' }} className="customContainer">
      <HomeNav 
        showResetPasswordModal={() => setShowResetModal(!showResetModal)}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <Sidebar
        open={open}
        accessList={accessList}
        handleDrawerClose={handleDrawerClose}
      />
      {/* Center Content */}
      <Main className='navAndContentDiv' open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
      {/* Utilities */}
      <ResetPassword
        showFunction = {showResetModal}
        showNextStep={showNextStep}
        errorMsg={errorMsg}
        onHideFunction = {handleCloseShowResetModal}
        handleConfirmCurrentPassword={handleConfirmCurrentPassword}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmNewPassword={confirmNewPassword}
        setCurrentPassword={setCurrentPassword}
        setNewPassword={setNewPassword}
        setConfirmNewPassword={setConfirmNewPassword}
        isSubmitting={isSubmitting}
        resetPasswordFunction={resetPasswordFunction}
      />
      <ToastNotification
        showToast={showToast}
        setShowToast={setShowToast}
        message={toastMessage}
        status={toastStatue}
      /> 
    </Box>
  )
}

