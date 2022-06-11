import React, { useState, useRef } from 'react'
import logo from '../../media/logo-Blue.png'
import './sideBar.css'
// import icon/s
import { FaChartBar, FaMapMarkerAlt, FaAlignJustify, FaUserFriends, FaIdBadge, FaPlus, FaVirus } from "react-icons/fa";
import { BsPhoneFill } from "react-icons/bs"
import { Link } from 'react-router-dom';
import axios from 'axios';
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
import CancelIcon from '@mui/icons-material/Cancel';
import { saveAs } from "file-saver"

const drawerWidth = 270;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const Sidebar = ({ open, handleDrawerClose, accessList }) => {

    const theme = useTheme();
    const [isDownloading, setIsDownloading] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const cancelTokenSource = useRef();

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
        cancelTokenSource.current = axios.CancelToken.source();

        axios({
            url: "https://juanbreath-server.herokuapp.com/api/admin/app/download",
            onDownloadProgress(progressEvent){
                progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setPercentage(progress);
            },
            cancelToken: cancelTokenSource.current.token,
            method: "GET",
            responseType: "blob"
        }).then((res) => {
            setIsDownloading(false)
            // prepare the data to a blob file
            const blob = new Blob([res.data], { type: "octet-stream"})
            saveAs(blob, "JuanBreath Admin App.apk")
        }).catch((err) => {
            setIsDownloading(false)
        })
    }

    const cancelDownload = () => {
        cancelTokenSource.current.cancel();
    }

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
                                    <Link key={index} to={item.link} style={{ textDecoration: "none"}}>
                                        <ListItem disablePadding>
                                            <ListItemButton className={`sideBarItem ${window.location.pathname === item.link && 'active'}`}>
                                                <ListItemIcon style={{ marginLeft: "13px", color: window.location.pathname === item.link && '#2a749f' }}>{item.icon}</ListItemIcon>
                                                <ListItemText primary={item.name} className='list-item-style' />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
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
                                    <Link key={index} to={item.link} style={{ textDecoration: "none"}}>
                                        <ListItem disablePadding>
                                            <ListItemButton 
                                                className={`sideBarItem ${window.location.pathname === item.link && 'active'}`} 
                                            >
                                                <ListItemIcon style={{ marginLeft: "13px", color: window.location.pathname === item.link && '#2a749f' }}>{item.icon}</ListItemIcon>
                                                <ListItemText primary={item.name} className='list-item-style' />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
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
                                    <Link key={index} to={item.link} style={{ textDecoration: "none"}}>
                                        <ListItem disablePadding>
                                            <ListItemButton component="a" href={item.link} className={`sideBarItem ${window.location.pathname === item.link && 'active'}`}>
                                                <ListItemIcon style={{ marginLeft: "13px", color: window.location.pathname === item.link && '#2a749f' }}>{item.icon}</ListItemIcon>
                                                <ListItemText primary={item.name} className='list-item-style' />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                </>
                            )})
                        }
                    </List>
                    <Divider />
                </>
            }
            <List>
                {
                    !isDownloading && 
                    <ListItem disablePadding>
                        <ListItemButton className={"sideBarItem"} onClick={() => { downloadApp()}} >
                            <ListItemIcon style={{ marginLeft: "13px"}}>
                                <BsPhoneFill className='mr-10'/>
                            </ListItemIcon>
                            <ListItemText primary={"Download App"} className='list-item-style' />
                        </ListItemButton>
                    </ListItem> 
                }
                {
                    isDownloading && 
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={{ marginLeft: "13px"}}>
                                <Spinner animation="border" role="status" style={{ height: "17px", width: "17px", color: "#2a749f"}}>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </ListItemIcon>
                            <ListItemText className='list-item-style' primary={`Downloading ${percentage}%`} />
                            <CancelIcon style={{ color: "red"}} onClick={() => { cancelDownload()}} />
                        </ListItemButton>
                    </ListItem>
                }
            </List>
        </Drawer>
        
    )
}
export default Sidebar