import React, { useState, useEffect } from 'react'
// import package/s
import Helmet from 'react-helmet';
// mock table data 
import { UsersCOLUMN } from '../../components/BasicTable/columns';
// component/s
import HomeContainer from '../../components/HomeContainer';
import BasicTable from '../../components/BasicTable';
import { getAllUsers } from "../../services/users/get";
// utilities
import SearchFields from '../../components/Search/index.js';
import Refresh from '../../components/Refresh/index.js';
import ToastNotification from '../../components/Toast/index.js';

const UserManagement = () => {

    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [query, setQuery] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastStatue, setToastStatus] = useState('');
    const [toastMessage, setToastMessage] = useState('');

     // filtering process
    const filteredData = (users) => {
        const keys = ["mobileNumber", "userHealthStatus", "userType", "createdAt"]
        return users.filter((item) => keys.some(key => item[key].toLowerCase().includes(query)));
    }

    // get all users accounts
    const _getAllUsers = async (allowToast) => {
        if(allowToast) {
            setIsFetching(true)
        }
        try {
            const admins = await getAllUsers();
            setUsers(admins.data?.data.reverse());
            setIsFetching(false);
            if(allowToast){
                setShowToast(!showToast);
                setToastMessage("The users list has been refreshed successfully.");
                setToastStatus('Success');
            }
        } catch (error) {
            setUsers([]);
            if(allowToast){
                setShowToast(!showToast);
                setToastMessage("Something went wrong!");
                setToastStatus('Error');
            }
        }
    }

    // this function will auto run on mount
    useEffect(() => {
        _getAllUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <HomeContainer >
            {/* Helmet for page's title*/}
            <Helmet>
                <title>JuanBreath | User Management</title>
            </Helmet>
            <div className='contentDiv'>
                <h1 className='contentTitle'>User Management</h1>
                <p className='tableCaption'>This table shows the list of other users registerd in the system.</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <SearchFields onSearch={setQuery}/>
                    <div style={{ marginTop: "20px"}}>
                        <Refresh onRefresh={_getAllUsers}/>
                    </div>
                </div>
                <BasicTable 
                    columnHeads = {UsersCOLUMN}
                    tableData = {filteredData(users)}
                    hasDelete={true}
                    hasEdit={true}
                    hasQR={false}
                    isFetching={isFetching}
                />
            </div>       
            <ToastNotification
                showToast={showToast}
                setShowToast={setShowToast}
                message={toastMessage}
                status={toastStatue}
            />
        </HomeContainer>
        
    )
}

export default UserManagement