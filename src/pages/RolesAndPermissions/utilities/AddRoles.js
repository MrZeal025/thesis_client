import React, { useState } from 'react'
// import css
import './CustomModals.css'
// import package/s
import { Form } from "react-bootstrap"
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, DialogContent, Divider } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddRoleModal = ({ method, permissions, modules }) => {
    
    const [name, setLocationName] = useState('');
    const [description, setLocationAddress] = useState('');
    const [currentPermissions, setCurrentPermissions] = useState([]);
    const [customPermissions, setCustomPermissions] = useState([]);
    const [show, setShow] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const onSubmit = () => {
    // create new instance of location for sending

        const locationSchema = {
            name: name,
            description: description,
            permissions: customPermissions
        }
        // pass the data to the method provided
        method(locationSchema);
        setCurrentPermissions([]);
        setCustomPermissions([]);
        // close the modal
        setShow(false);
    }

    const selectPermissions = (data) => {
        const permissionsID = [];

        if(currentPermissions.length > 0) {
            for(let j = 0; j < currentPermissions.length; j++) {
                if(currentPermissions[j].permissionName === data) {
                    setCurrentPermissions(currentPermissions.filter((removalPerm) => { return removalPerm.permissionName !== data}));
                    setCustomPermissions(customPermissions.filter((d) => { return !currentPermissions[j].permissionsID.includes(d)}));
                } 
                else {
                    console.log(data)
                    const filterPermission = permissions.filter((permission) => { return permission.name.split(':')[0] === data })

                    for(let i = 0; i < filterPermission.length; i++) {
                        permissionsID.push(filterPermission[i]._id)
                    }
                    setCurrentPermissions([...currentPermissions, { permissionName: data, permissionsID: permissionsID }])
                    setCustomPermissions([...customPermissions, ...permissionsID])
                }
            }
        } 
        else {
            const filterPermission = permissions.filter((permission) => { return permission.name.split(':')[0] === data })

            for(let i = 0; i < filterPermission.length; i++) {
                permissionsID.push(filterPermission[i]._id)
            }
            setCurrentPermissions([...currentPermissions, { permissionName: data, permissionsID: permissionsID }])
            setCustomPermissions([...customPermissions, ...permissionsID])
        }
    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (show) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [show]);

    return (
        <>
            <Button className='primaryBtn' onClick={handleShow} variant="contained">Add Role</Button>
            {
                console.log(currentPermissions)
            }
            {
                console.log(customPermissions)
            }
            <Dialog 
                open={show} 
                fullScreen 
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: "#2a749f"}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Create a new Role
                        </Typography>
                        <Button onClick={() => { onSubmit() }} variant="outlined" style={{  color: "white", border: "1px solid white"}}>
                            Create
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers={scroll === 'paper'}>
                    <Box style={{ padding: "0 10%"}}>
                        <Typography variant="h5" component="div" style={{ fontWeight: "bold", marginBottom: "10px", color: "#2a749f"}}>Basic Information</Typography>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Role Name <b className='text-danger'>*</b></Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter name of role" 
                                onChange={e => setLocationName(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Role Description <b className='text-danger'>*</b></Form.Label>
                            <Form.Control 
                                type="text"
                                as="textarea" 
                                rows={3}
                                placeholder="Type something" 
                                onChange={e => setLocationAddress(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <Typography variant="h5" component="div" style={{ fontWeight: "bold", marginBottom: "10px", color: "#2a749f"}}>Systems Permissions</Typography>
                        {
                            modules.map((module, i) => {
                                return(
                                    <Card 
                                        style={{ 
                                            marginBottom: "10px", 
                                            padding: "20px 20px 0px 20px", 
                                            backgroundColor: "#e0edfa" 
                                        }}
                                    >
                                        {/* renders the module name */}
                                        <FormGroup>
                                            <FormControlLabel  
                                                control={<Checkbox onClick={() => selectPermissions(module)} />}
                                                label={module} 
                                            />
                                        </FormGroup>
                                        <Divider/>
                                        {/* segregate the permissions */}
                                        <CardContent>
                                            {
                                                permissions?.map((permission) => { 
                                                    if(permission.name.split(':')[0] === module) {
                                                        return (
                                                            <FormGroup>
                                                                <FormControlLabel  
                                                                    control={<Checkbox  checked={customPermissions.includes(permission._id)} disabled />}
                                                                    label={permission.name} 
                                                                />
                                                            </FormGroup>
                                                        )
                                                    }
                                                    return null;
                                                })
                                            }
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default AddRoleModal;