import React from 'react'
// import css
import '../userhome.css'
// import media
import logo from '../../../media/logo-White.png'
import {Link} from "react-router-dom"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const UserHomeNav = () => {
    return (
        <div className='userHomeNav'>
            <div className='appTitle'>
                <img src={logo} height={40} alt='JuanBreath Logo' className='mr-10'/>
                <h3 style={{ fontWeight: "bold"}}>JuanBreath</h3>
            </div>
            <div className='signInLinkDiv'>
                <Link to='/login' className='signInLink'>Admin Login <ArrowForwardIcon fontSize='12' /></Link>
            </div>
        </div>
    )
}

export default UserHomeNav