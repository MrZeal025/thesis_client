import React, { useState, useEffect } from 'react'
import logo from '../../media/logo-Blue.png'
import './sideBar.css'
import jwtDecode from 'jwt-decode';
// import icon/s
import { FaChartBar, FaMapMarkerAlt, FaAlignJustify, FaUserFriends, FaIdBadge, FaPlus, FaVirus } from "react-icons/fa";
import { BsPhoneFill } from "react-icons/bs"

import axios from 'axios';
import { checkAccess } from "../../services/auth/login";

import FileDownload from "js-file-download";
import Spinner from 'react-bootstrap/Spinner'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';

const drawerWidth = 250;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const Sidebar = ({ open, handleDrawerClose }) => {

    const [accessList, setAccess] = useState([])

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

    const theme = useTheme();
    const [isDownloading, setIsDownloading] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const graph = [
        {
            name: "Dashboard",
            accessData: "Dashboard:Read",
            link: "/dashboard",
            icon: <FaChartBar className='mr-10' height={50}/>
        },
        {
            name: "Locations",
            accessData: "Location:Read",
            link: "/locations",
            icon: <FaMapMarkerAlt className='mr-10' height={50}/>
        }
    ]

    const items = [
        {
            name: "Disease Management",
            accessData: "Disease:Read",
            link: "/diseases",
            icon: <FaVirus className='mr-10' height={50}/>
        },
        {
            name: "Visitation Logs",
            accessData: "Visitation-History:Read",
            link: "/visitation-logs",
            icon: <FaAlignJustify className='mr-10' height={50}/>
        },
        {
            name: "Positive Update Logs",
            accessData: "Contact-Tracing-Logs:Read",
            link: "/positive-tracing-logs",
            icon: <FaPlus className='mr-10' height={50}/>
        }
    ]

    const management = [
        {
            name: "Admin Management",
            accessData: "Admin:Read",
            link: "/admin-management",
            icon: <FaUserFriends className='mr-10' height={50}/>
        },
        {
            name: "User Management",
            accessData: "Users:Read",
            link: "/user-management",
            icon: <FaUserFriends className='mr-10' height={50}/>
        },
        {
            name: "Roles & Permissions",
            accessData: "Role:Read",
            link: "/roles-and-permissions",
            icon: <FaIdBadge className='mr-10' height={50}/>
        }
    ]

    // ADD this function on onClick of download Button
    const downloadApp =  () => {
        setIsDownloading(true)
        let progress = 0;
        axios({
            url: "https://juanbreath-server.herokuapp.com/api/admin/app/download",
            onDownloadProgress(progressEvent){
                progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setPercentage(progress);
            },
            method: "GET",
            responseType: "blob"
        }).then((res) => {
            setIsDownloading(false)
            FileDownload(res.data, "JuanBreath Admin App.apk")
        }).catch((err) => {
            setIsDownloading(false)
            alert(err)
        })
    }

    useEffect(() => {
        // get the local token, decode and reuse the users user name as navbar header
        const token = localStorage.getItem('accessToken');
        const decodedToken = token ? jwtDecode(token) : null
        check(decodedToken.role)
    },[]);

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <div className='companyGrp'>
                    <img src={logo} alt='logo' height={40} className='companyLogo'/>
                    <div style={{ marginLeft: "5px", paddingTop: "5px" }}>
                        <h5 className='companyName'>JuanBreath</h5> 
                        <p className='companyName2'>ADMIN</p>
                    </div>
                </div>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            {
                graph.filter((item) => (accessList.includes(item.accessData))).length > 0 &&  
                <>
                    <Divider />
                    <List>
                        {
                            graph.map((item, index) => {
                                return (
                                    accessList.includes(item.accessData) && <>
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton component="a" href={item.link} className={`sideBarItem ${window.location.pathname === item.link && 'active'}`}>
                                            <ListItemIcon style={{ marginLeft: "13px", color: window.location.pathname === item.link && '#2a749f' }}>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.name} style={{ fontWeight: "700" }} />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            )})
                        }
                    </List>
                </>
            }
            {
                // component 1
                items.filter((item) => (accessList.includes(item.accessData))).length > 0 &&  
                <>
                    <Divider />
                    <List>
                        {
                            items.map((item, index) => {
                                return (
                                    accessList.includes(item.accessData) && <>
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton component="a" href={item.link} className={`sideBarItem ${window.location.pathname === item.link && 'active'}`}>
                                            <ListItemIcon style={{ marginLeft: "13px", color: window.location.pathname === item.link && '#2a749f' }}>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.name} style={{ fontWeight: "700" }} />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            )})
                        }
                    </List>
                </>
            }
            {
                // component 2
                management.filter((item) => (accessList.includes(item.accessData))).length > 0 && 
                <>
                    <Divider />
                    <List>
                        {
                            management.map((item, index) => {
                                return (
                                    accessList.includes(item.accessData) && <>
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton component="a" href={item.link} className={`sideBarItem ${window.location.pathname === item.link && 'active'}`}>
                                            <ListItemIcon style={{ marginLeft: "13px", color: window.location.pathname === item.link && '#2a749f' }}>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.name} style={{ fontWeight: "700" }} />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            )})
                        }
                    </List>
                    <Divider />
                </>
            }
            {
                !isDownloading && 
                    <ListItem disablePadding>
                        <ListItemButton className={"sideBarItem"} onClick={() => { downloadApp()}} >
                            <ListItemIcon style={{ marginLeft: "13px"}}>
                                <BsPhoneFill className='mr-10'/>
                            </ListItemIcon>
                            <ListItemText primary={"Download App"} style={{ fontWeight: "700" }} />
                        </ListItemButton>
                    </ListItem> 
            }
            {
                isDownloading && <ListItem disablePadding>
                    <ListItemButton>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner><p>Download {percentage}%</p>
                    </ListItemButton>
                </ListItem>
            }
        </Drawer>
        
    )
}
export default Sidebar