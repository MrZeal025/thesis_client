import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Helmet from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// User Landing Page
import UserHome from './pages/UserHome';
// Login Page
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordNotification from './pages/ForgotPassword/utilities/ForgotPasswordNotification';
// Pages inside Main Admin
import Dashboard from './pages/Dashboard';
import Locations from './pages/Locations';
import ContactTracingLogs from './pages/ContactTracingLogs';
import AdminManagement from './pages/AdminManagement';
import RolesAndPermissions from './pages/RolesAndPermissions';
import UserManagement from './pages/UserManagement';
import PositiveTracingLogs from './pages/PositiveUpdateLogs';
import ProfilePage from './pages/Profile';
import Diseasemanagement from './pages/DiseaseManagement';
//utilities
import jwt_decode from 'jwt-decode';
import { checkAccess } from './services/auth/login';

// axios interceptors
import axios from 'axios';
import { setupInterceptorsTo } from "./axios/interceptors";
import NotFoundRoute from './routes/NotFoundRoute';

setupInterceptorsTo(axios);

function RequireAuth({ children }) {
  // decode token from the api
  const token = localStorage.getItem('accessToken');
  const decodedToken = token ? jwt_decode(token) : null;
  let location = useLocation();
 
  if (!decodedToken || null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {

  const [token, setToken] = useState(null);
  const [accessList, setAccess] = useState([])
  const shortLiveKey = localStorage.getItem('shortlivekey')

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
    // get the local token, decode and reuse the users user name as navbar header
    const token = localStorage.getItem('accessToken');
    const decodedToken = token ? jwt_decode(token) : null
    if(decodedToken) {
      check(decodedToken.role)
      setToken(token);
    }

  },[]);

  return (
    <div>
      {/* Helmet for page's title*/}
      <Helmet>
        <title>JuanBreath Admin</title>
      </Helmet>
      {/* Routing */}
      <Router>
        <Routes>
          {/* User Landing Page */}
          
          <Route path="/" element={<UserHome />} />
          <Route path="/mobile-app-download" element={<UserHome />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Reset Password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path={`${shortLiveKey}/forgot-password-notification`} element={<ForgotPasswordNotification />} />

          {/* Main Admin Pages */}
          {
            accessList.filter((item) => (item.includes("Dashboard:Read"))).length > 0 && 
            <Route 
              path="/dashboard" 
              element={
                <RequireAuth>
                  <Dashboard/>
                </RequireAuth>
              } 
            />
          }
          {
            accessList.filter((item) => (item.includes("Location:Read"))).length > 0 && 
            <Route 
              path="/locations" 
              element={
                <RequireAuth>
                  <Locations/>
                </RequireAuth>
              } 
            />
          }
          {
            accessList.filter((item) => (item.includes("Disease:Read"))).length > 0 && 
            <Route 
              path="/diseases" 
              element={
                <RequireAuth>
                  <Diseasemanagement/>
                </RequireAuth>
              } 
            />
          }
          {
            accessList.filter((item) => (item.includes("Visitation-History:Read"))).length > 0 && 
            <Route 
              path="/visitation-logs" 
              element={
                <RequireAuth>
                  <ContactTracingLogs/>
                </RequireAuth>
              } 
            />
          }
          {
            accessList.filter((item) => (item.includes("Contact-Tracing-Logs:Read"))).length > 0 && 
            <Route 
              path="/positive-tracing-logs" 
              element={
                <RequireAuth>
                  <PositiveTracingLogs/>
                </RequireAuth>
              } 
            />
        }
          {
            accessList.filter((item) => (item.includes("Users:Read"))).length > 0 && 
            <Route 
              path="/user-management" 
              element={
                <RequireAuth>
                  <UserManagement/>
                </RequireAuth>
              } 
            />
          }
          {
            accessList.filter((item) => (item.includes("Admin:Read"))).length > 0 && 
            <Route 
              path="/admin-management" 
              element={
                <RequireAuth>
                  <AdminManagement/>
                </RequireAuth>
              } 
            />
          }
         {
           accessList.filter((item) => (item.includes("Role:Read"))).length > 0 && 
            <Route 
              path="/roles-and-permissions" 
              element={
                <RequireAuth>
                  <RolesAndPermissions/>
                </RequireAuth>
              } 
            />
         }
          <Route 
            path="/profile" 
            element={
              <RequireAuth>
                <ProfilePage/>
              </RequireAuth>
            } 
          />
          { (accessList.length > 0 || token === null) && <Route path="*" element={<NotFoundRoute/>} /> }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
