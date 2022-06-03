import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import HomeNavBar from './muinav';
// stylesheet
import './homeNav.css'

const logout = () => {
    // add all items on the local storage related to users session and information
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    window.location.href ="/"
}

const HomeNav = ({ showResetPasswordModal, handleDrawerOpen, open }) => {

    const [fullName, setUserFullName] = useState('');

    useEffect(() => {
        try {
            // get the local token, decode and reuse the users user name as navbar header
            const token = localStorage.getItem('accessToken');
            const decodedToken = token ? jwtDecode(token) : null
            if(decodedToken) {
                setUserFullName(decodedToken.firstName + " " + decodedToken.lastName)
            }

        } catch (error) {
            setUserFullName('JuanBreath Admin')   
        }
    },[]);

    return (
        <HomeNavBar
            fullName={fullName}
            showResetPasswordModal={showResetPasswordModal}
            logout={logout}
            open={open}
            handleDrawerOpen={handleDrawerOpen}
        />
    )
}

export default HomeNav