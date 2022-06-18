import React from 'react';
import "./systemguide.css"
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider, Paper } from '@mui/material';
// components
import HomeContainer from '../../components/HomeContainer';
// images
import WebsiteLanding from "../../media/system-guide/Website-Inro.png";
import gotologin from "../../media/system-guide/Go-to-login.png";
import login from "../../media/system-guide/login.png";
import admin1 from "../../media/system-guide/admin-management.png";
import admin2 from "../../media/system-guide/admin-management-2.png";
import admin3 from "../../media/system-guide/admin-management-3.png";
import admin4 from "../../media/system-guide/admin-management-4.png";
import admin5 from "../../media/system-guide/admin-management-5.png";
import admin6 from "../../media/system-guide/admin-management-6.png";
import sys from "../../media/system-guide/system.png"
import sys1 from "../../media/system-guide/system-1.png"
import sys2 from "../../media/system-guide/system-2.png"
import sys3 from "../../media/system-guide/system-3.png"
import sys4 from "../../media/system-guide/system-4.png"
import sys6 from "../../media/system-guide/system-6.png"
import sys7 from "../../media/system-guide/system-7.png"
import sys8 from "../../media/system-guide/system-8.png"
import sys9 from "../../media/system-guide/system-9.png"
import sys91 from "../../media/system-guide/system-91.png"

const SystemsGuide = () => {
    return (
        <HomeContainer>
            <Helmet>
                <title>JuanBreath | Systems Guide</title>
            </Helmet>
            <div className='titleAndButtonDiv'>
                <h1 className='contentTitle'>Systems Guide</h1>
            </div>
            <p className='tableCaption'>This page shows a detailed explaination of how the sytem works.</p>
            <Paper style={{ padding: "20px"}}>
                <h3 style={{ color: "#2a749f"}}>1. How to access the systems website?</h3>
                <Divider/>
                <div style={{ marginTop: "20px", paddingLeft: "50px", paddingRight: "50px"}} className='contentDiv'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <img src={WebsiteLanding} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 1: ACCESS THE SYSTEMS WEBSITE</h5>
                                <p>You can access the system by typing <b>https://juanbreath.herokuapp.com</b> in your local browser.</p>
                                <p>A page similar to the one displayed on the left side of the screen will appear.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={gotologin} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 2: GO TO LOGIN PAGE</h5>
                                <p>By clicking the <b>Admin Login</b> Link on the upper right most corner of the screen you will be redirected to the login page.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={login} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 3: LOGIN USING THE PROVIDED ACCOUNT DETAILS</h5>
                                <p>The given credentials are default upon turnover of the system.</p>
                                <p>Username: <b>jb_admin</b></p>
                                <p>Password: <b>juanbreath_admin</b></p>
                            </Grid>
                        </Grid>
                    </Box>            
                </div>
            </Paper>
            <Paper style={{ padding: "20px", marginTop: "10px"}}>
                <h3 style={{ color: "#2a749f"}}>2. How to create another admin account?</h3>
                <Divider/>
                <div style={{ marginTop: "20px", paddingLeft: "50px", paddingRight: "50px"}} className='contentDiv'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <img src={admin1} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 1: GO TO ADMIN MANAGEMENT</h5>
                                <p>On any page of the system, click the admin management link on the left panel of the monitor.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={admin2} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 2: OPEN CREATE POP UP</h5>
                                <p>By clicking the <b>Create Account</b> Button on the upper right corner of the screen a pop up screen will open consisting of fields for registration.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={admin3} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 3: PROVIDE CREDENTIALS</h5>
                                <p>In order to create the admin account, provide the following fields on the pop up screen.</p>
                                <p>Note: Fields with <b style={{color: "red"}}>*</b> next to the label are required.</p>
                                <p>The default <b>password and other details</b> of the created account will be <b>emailed to the registered email</b> on the form for confirmation.</p>
                                <p>Select an appropriate role based on what this account's purpose.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={admin4} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 4: GO TO ROLES AND PERMISSIONS</h5>
                                <p>If you have no clue what the role does, click the roles and permissions link on the left pannel.</p>
                                <p>This will open the Roles and Permission page, shown below.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={admin5} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 5: VIEW / CREATE ROLE</h5>
                                <p>The center panel on the page shows the name and description of the role, the permission section shows what pages the role can access.</p>
                                <p>Note: Each permission corresponds with the item on the sidebar panel of the system.</p>
                                <p>By default the Superadmin Role has the access for all the feature of the system.</p>
                                <p>Should the admin what to create a new role, just click the <b>Add Role</b> Button on the upper right of the table.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={admin6} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 6: CREATING ROLE ACCESS</h5>
                                <p>Fill up the role name and description.</p>
                                <p>Check only the features that account being created can access.</p>
                                <p>Click the create button on the upper right corner of the screen.</p>
                            </Grid>
                        </Grid>
                    </Box>            
                </div>
            </Paper>
            <Paper style={{ padding: "20px", marginTop: "10px"}}>
                <h3 style={{ color: "#2a749f"}}>3. Basic System Features</h3>
                <Divider/>
                <div style={{ marginTop: "20px", paddingLeft: "50px", paddingRight: "50px"}} className='contentDiv'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <img src={sys} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 1: LOCATION SETUP</h5>
                                <p>On any page of the system, click the <b>location</b> link on the left panel of the monitor.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={sys3} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 2: OPEN CREATE POP UP</h5>
                                <p>By clicking the <b>Add Location</b> Button on the upper right corner of the screen a pop up screen will open consisting of fields for creating new location.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={sys1} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 3: PROVIDE LOCATION DETAILS</h5>
                                <p>In order to create the location, provide the following fields on the pop up screen.</p>
                                <p>Note: Fields with <b style={{color: "red"}}>*</b> next to the label are required.</p>
                                <p>All create location has a downloadable QR Code which is used for the user scanning when arriving to the location.</p>
                                <p>Just click the first icon on the actions column on the Locations table in order to view the QR Code of a location.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={sys2} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 4: VIEW AND DOWNLOAD QR CODE</h5>
                                <p>This QR Code can be scanned directly from the location page</p>
                                <p>To download the QR Code just press the <b>Save QR Code as Image</b> on the upper right most corner of the screen.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={sys4} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 5: VIEW LOCATIONS VISITATION HISTORY</h5>
                                <p>By clicking the Visitation Logs link on the sidebar of the screen, a similar page from the left side will be shown.</p>
                                <p>This contains the visitation logs for all the locations created on the system.</p>
                                <p>After a successful creation of the locations, the admin can or any authorized personnel of the facility can put the Downloaded QR Code on the facility entrances.</p>
                                <p>This <b>QR Code</b> will then be scanned by the mobile app of the users.</p>
                                <p>The personnel incharge should notify the user that scanning and leaving the facility is required.</p>
                            </Grid>
                        </Grid>
                    </Box>            
                </div>
            </Paper>
            <Paper style={{ padding: "20px", marginTop: "10px"}}>
                <h3 style={{ color: "#2a749f"}}>4. Data Monitoring</h3>
                <Divider/>
                <div style={{ marginTop: "20px", paddingLeft: "50px", paddingRight: "50px"}} className='contentDiv'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <img src={sys} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>1. Dashboard Monitoring</h5>
                                <p>This is page shows the monitoring data of the system, tracing all users of the system, positive and recovered reports.</p>
                                <p>The Counter shows how many additions are monitored per day.</p>
                                <p>The Graph shows the number of usages per week, from the selected date.</p>
                                <p>The dashboard features 2 graphs, one for total visitaions per registered location, and on for health statue per week.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={sys6} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>2. Disease Management</h5>
                                <p>By clicking the <b>Disease Management</b> Button on the side bar, the picture on the left will be shown.</p>
                                <p>This page is the main control for tracing new diseases by adding them into the system so that users can report if they catch the virus.</p>
                                <p>This features an integrated map tracer that displays all reported cases by putting a heat map on that location.</p>
                                <p>Diseases can be color coded upon tracing.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={sys7} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>3. Positive Logs and Contact Tracing</h5>
                                <p>By Clicking the <b>Positive Update Logs</b> Link on the side bar a similar page as shown in the left image will appear on the screen.</p>
                                <p>This list are all positive logs for all user that has a confirmed disease cased, and has reported in the system.</p>
                                <p>By Clicking the trace button, contact tracing will proceced.</p>
                            </Grid>
                        </Grid>
                    </Box>            
                </div>
            </Paper>
            <Paper style={{ padding: "20px", marginTop: "10px"}}>
                <h3 style={{ color: "#2a749f"}}>5. How to start contact tracing?</h3>
                <Divider/>
                <div style={{ marginTop: "20px", paddingLeft: "50px", paddingRight: "50px"}} className='contentDiv'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <img src={sys7} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 1: Click the <b>Trace</b> Button on the positive logs table.</h5>
                                <p>By clicking the trace button, the system will automatically start its contact tracing procedure.</p>
                                <p>A pop up screen will appear containing necessary information for the tracing.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={sys8} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 2: Verifying the Positive Case Information</h5>
                                <p>Personal Information of the infected personl will be taken, for health profiling.</p>
                                <p>This information should not be share to anyone, unless they are health personnel, or the administrator.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={sys9} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 3: View Visitation History</h5>
                                <p>The system will show the visitation history of the infected user over the course of 14 days.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={6}>
                                <img src={sys91} alt="website-intro" className="system-guid-pic" />
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Step 4: Close Contact</h5>
                                <p>This section shows the possible close contact of the infected person which has been exposed for <b>15 minutes or more over the course of 24 hours</b>.</p>
                                <p>Administrator can alert all close contact by pressing the <b>Alert All Close Contact</b> Button on the left upper part of the table.</p>
                            </Grid>
                        </Grid>
                    </Box>            
                </div>
            </Paper>
        </HomeContainer>
    );
}

export default SystemsGuide;
