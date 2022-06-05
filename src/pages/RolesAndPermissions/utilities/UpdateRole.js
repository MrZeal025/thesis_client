import React, { useState, useEffect } from 'react'
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

const UpdateRoleModal = ({ 
    method, 
    permissions, 
    modules, 
    show, 
    onHideFunction, 
    data
}) => {
    
    const [name, setLocationName] = useState('');
    const [description, setLocationAddress] = useState('');
    const [currentPermissions, setCurrentPermissions] = useState([]);
    const [customPermissions, setCustomPermissions] = useState([]);
    const [scroll, setScroll] = useState('paper');
    const [currentModule, setCurrentModule] = useState([])

    const onSubmit = () => {
    // create new instance of location for sending
        const locationSchema = {
            name: name,
            description: description,
            permissions: customPermissions
        }
        // pass the data to the method provided
        method(locationSchema);

        setCurrentModule([])
        setCurrentPermissions([]);
        setCustomPermissions([]);

        onHideFunction();

    }

    // function for saving the selected role
    const savedSelectedRole = (data) => {
        let permissionsID = [];
        // filter permission based on the selected module
        const filterPermission = permissions.filter((permission) => { return permission.name.split(':')[0] === data })
        //  loop from the filtered permission and get the _id 
        for(let i = 0; i < filterPermission.length; i++) {
            permissionsID.push(filterPermission[i]._id)
        }
        setCurrentModule([...currentModule, data])
        setCurrentPermissions([...currentPermissions, { permissionName: data, permissionsID: permissionsID }])
        setCustomPermissions([...customPermissions, ...permissionsID])
        permissionsID =  [];
    }

    const removeSelectedRole = (data) => {
        let permissionsID = [];
        
        const filterPermission = currentPermissions.filter((permission) => { return permission.permissionName !== data })
        const filteredCurrentMod = currentModule.filter((module) => { return module !== data});

        for(let i = 0; i < filterPermission.length; i++) {
            permissionsID.push(...filterPermission[i].permissionsID)
        }
        setCurrentModule(filteredCurrentMod)
        setCurrentPermissions([...filterPermission])
        setCustomPermissions([...permissionsID]);
        permissionsID = [];
    }

    const selectPermissions = (data) => {
        if(currentPermissions.filter((permission) => { return permission.permissionName === data }).length > 0) {
            for(let j = 0; j < currentPermissions.length; j++) {
                removeSelectedRole(data);
            }
        } 
        else {
            // save selected role
            savedSelectedRole(data)
        }
    }

    const descriptionElementRef = React.useRef(null);

    useEffect(() => {
        if (show) {
            
            const { current: descriptionElement } = descriptionElementRef;

            if (descriptionElement !== null) {
                descriptionElement.focus();
            }

            let module = []
            let filteredPerms = []
            let currentPerms = []
            let permissionsID = [];

            for(let i = 0; i < data.permissions.length; i++) {
                module.push(data.permissions[i].name.split(':')[0])
            }

            // get all unique module
            const unique = [...new Set(module)]
            setCurrentModule(unique);


            for(let x = 0; x < unique.length; x++) {
                // filter permission based on the selected module
                const filterPermission = permissions.filter((permission) => { return permission.name.split(':')[0] === unique[x] })
                filteredPerms.push(...filterPermission)
            }

            for(let i = 0; i < filteredPerms.length; i++) {
                permissionsID.push(filteredPerms[i]._id)
            }

            for(let x = 0; x < unique.length; x++) {
                
                let perModuleId = []

                const filterPermission = permissions.filter((permission) => { return permission.name.split(':')[0] === unique[x] })
                //  loop from the filtered permission and get the _id 
                for(let i = 0; i < filterPermission.length; i++) {
                    perModuleId.push(filterPermission[i]._id)
                }
                currentPerms.push({ permissionName: unique[x], permissionsID: perModuleId })
            }
            setLocationName(data.name)
            setLocationAddress(data.description)
            setCurrentPermissions(currentPerms)
            setCustomPermissions(permissionsID)
        }
    }, [show]);

    return (
        <>
            <Dialog 
                open={show} 
                fullScreen 
                onClose={onHideFunction}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: "#2a749f"}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onHideFunction}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Update {`${data.name}`} Role
                        </Typography>
                        <Button onClick={() => { onSubmit() }} variant="outlined" style={{  color: "white", border: "1px solid white"}}>
                            Update
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
                                value={name}
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
                                value={description}
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
                                                control={<Checkbox checked={currentModule.includes(module)} onClick={() => selectPermissions(module)} />}
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
                                                                    control={<Checkbox checked={customPermissions.includes(permission._id)} disabled />}
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
export default UpdateRoleModal;