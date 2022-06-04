import React, {useState, useEffect} from 'react'
// import package/s
import Helmet from 'react-helmet';
import QRCode from 'qrcode';
// component/s
import HomeContainer from '../../components/HomeContainer/index.js';
import BasicTable from '../../components/BasicTable'
// import table data
import { DiseasesCOLUMNS } from '../../components/BasicTable/columns';
import ToastNotification from '../../components/Toast/index.js';
// apis
import { getAllDiseases } from '../../services/diseases/get.js';
import { postOneDisease } from '../../services/diseases/post';
import { putOneDisease } from "../../services/diseases/put"
import { deleteOneDisease } from '../../services/diseases/delete.js';
// modals
import AddLocationModal from './utilities/AddLocationModal.js';
import EditLocationModal from './utilities/EditLocationModal.js';
import DeleteLocationModal from './utilities/DeleteLocationModal.js';
// utilities
import SearchFields from '../../components/Search/index.js';
import Refresh from '../../components/Refresh/index.js';

const Diseasemanagement = () => {
    // location default state
    const [locations, setLocations] = useState([]);
    const [hasErrors, setHasErrors] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [editId, setEditId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [dataToBeEdit, setDataToBeEdit] = useState({ name: "" });
    const [dataToBeDeleted, setDataToBeDeleted] = useState('');
    const [toastStatue, setToastStatus] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const [query, setQuery] = useState("");
    
    // filtering process
    const filteredData = (locations) => {
        const keys = ["name", "totalMonitoredToday", "totalTraceCount"]
        return locations.filter((item) => keys.some(key => item[key].toLowerCase().includes(query)));
    }

    // Edit Modal Declarations
    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseShowEditModal = () => setShowEditModal(false);

    //Delete Modal Declarations
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseShowDeleteModal = () => setShowDeleteModal(false);

    const handleShowDeleteModal = (id) => {
        setShowDeleteModal(true)
        setDeleteId(id)
        // filter the data requested for deleting
        const filterdData = locations.filter((location) => { return location._id === id })  
        setDataToBeDeleted(filterdData[0]?.name)
    }

    // Edit Modal Functions
    const handleShowEditModal = (id) => {
        setShowEditModal(true);
        setEditId(id);

        // filter the data requested for editing
        const filterdData = locations.filter((location) => { return location._id === id })  
        setDataToBeEdit(filterdData[0])
    }
    // modify the selected item
    const handleDataEdit = (value, field) => {
        setDataToBeEdit({...dataToBeEdit, [field]: value })
    }


    const _getAllLocation = async (allowToast) => {
        try {
            const locations = await getAllDiseases();
            setLocations(locations.data?.data);
            setIsFetching(false);
            if(allowToast){
                setShowToast(!showToast);
                setToastMessage("The disease list has been refreshed successfully.");
                setToastStatus('Success');
            }
        } catch (error) {
            setHasErrors(true);
            setLocations([]);
            if(allowToast){
                setShowToast(!showToast);
                setToastMessage("Something went wrong!");
                setToastStatus('Error');
            }
        }
    }
    // send the data to the backend to be created
    const _postOneLocation = async (data) => {
        try {
            const result = await postOneDisease(data);
            if(result.data.success) {
                setLocations([...locations, result.data.data]);
                setShowToast(!showToast);
                setToastMessage("The disease has been created successfully.");
                setToastStatus('Success');
            }
        } catch (error) {
            setShowToast(!showToast);
            setToastMessage("Something went wrong.");
            setToastStatus('Error');
        }
    }

    const _putOneLocation = async () => {
        try {
            const newLocation = {
                name: dataToBeEdit.name
            }
            const result = await putOneDisease(newLocation, editId);
            if(result.data.success) {
                // removed the edited data from the set
                const filterdData = locations.filter((location) => { return location._id !== editId })
                setLocations([...filterdData, result.data.data]);
                setShowToast(!showToast);
                setShowEditModal(!showEditModal);
                setToastMessage("The disease information has been updated successfully.");
                setToastStatus('Success');
            }
        } catch (error) {
            setShowToast(!showToast);
            setToastMessage("Something went wrong.");
            setToastStatus('Error');
        }
    }

    const _deleteOneLocation = async () => {
        try {
            const result = await deleteOneDisease(deleteId);
            if(result.data.success){
                // filter the data requested for editing
                const filterdData = locations.filter((location) => { return location._id !== deleteId })  
                setLocations([...filterdData]);
                setShowToast(!showToast);
                setShowDeleteModal(!showDeleteModal)
                setToastMessage("The disease has been deleted successfully.");
                setToastStatus('Success');
            }
        } catch (error) {
            setShowToast(!showToast);
            setToastMessage("Something went wrong.");
            setToastStatus('Error');
        }
    }

    useEffect(() => {
        _getAllLocation();
        // eslint-disable-next-line
    }, []);

    return (
        <HomeContainer>
            {/* Helmet for page's title*/}
            <Helmet>
                <title>JuanBreath | Locations</title>
            </Helmet>
            <div className='titleAndButtonDiv'>
                <h1 className='contentTitle'>Disease Management</h1>
            </div>
            <div className='contentDiv'>
                <p className='tableCaption'>This table shows the list of disease that are being tracked on the system</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <SearchFields onSearch={setQuery}/>
                    <div style={{ marginTop: "20px"}}>
                        <Refresh onRefresh={_getAllLocation}/>
                        <AddLocationModal 
                            method={_postOneLocation}
                        />
                    </div>
                </div>
                <BasicTable
                    columnHeads = {DiseasesCOLUMNS}
                    tableData = {filteredData(locations)}
                    hasDelete={true}
                    hasEdit={true}
                    editModalFunction={handleShowEditModal}
                    deleteModalFunction={handleShowDeleteModal}
                    isFetching={isFetching}
                />
                {
                    hasErrors && <div>Something went wrong</div>
                }
            </div>
            <EditLocationModal 
                showFunction = {showEditModal}
                onHideFunction = {handleCloseShowEditModal}
                data={dataToBeEdit}
                dataEditMethod = {handleDataEdit}
                submitEditMethod={_putOneLocation}
            />
            <DeleteLocationModal
                showFunction = {showDeleteModal}
                onHideFunction = {handleCloseShowDeleteModal}
                data = {dataToBeDeleted}
                submitDeleteMethod={_deleteOneLocation}
            />
            <ToastNotification
                showToast={showToast}
                setShowToast={setShowToast}
                message={toastMessage}
                status={toastStatue}
            />
        </HomeContainer>
        
    )
}

export default Diseasemanagement