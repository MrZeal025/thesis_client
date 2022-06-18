import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
// icons
import BookIcon from '@mui/icons-material/Book';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Book from '@mui/icons-material/Book';

const drawerWidth = 270;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function HomeNavBar({ fullName, showResetPasswordModal, logout, open, handleDrawerOpen }) {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            style={{ top: "40px"}}
        >
            <MenuItem 
                color='grey' 
                onClick={() => { window.location.href ="/profile"}}
            >
                <AccountCircleIcon style={{ marginRight: "6px", color: "grey" }}/> Profile
            </MenuItem>
            <MenuItem 
                color='grey' 
                onClick={() => { showResetPasswordModal()}}
            >
                <LockResetIcon style={{ marginRight: "6px", color: "grey"}}/> Reset Password
            </MenuItem>
            <MenuItem 
                color='grey' 
                onClick={() => {  window.location.href ="/systems-guide"}}
            >
                <Book style={{ marginRight: "6px", color: "grey"}}/> Guide
            </MenuItem>
            <Divider/>
            <MenuItem color='grey' onClick={() => { logout()}}><ExitToAppIcon style={{ marginRight: "6px", color: "grey"}}/> Sign Out</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed' open={open} className='homeNav'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2, ...(open && { display: 'none' })   }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="p" noWrap component="div">
                        {fullName}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <ArrowDropDownIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            { renderMenu}
        </Box>
    )
};
