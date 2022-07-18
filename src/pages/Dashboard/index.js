import React, { useState, useEffect } from 'react'
// css
import './dashboard.css'
// import package/s
import Helmet from 'react-helmet'
// component/s
import HomeContainer from '../../components/HomeContainer'
import WeeklyHealthStatusGraph from './charts/HealthLineChart'
import WeeklyHealthBarStatusGraph from './charts/HealthBarChart'
import VisitationBarChart from './charts/VisitationBarChart'
import VisitationLineChart from './charts/VisitationLinChart';
// utilities
import RefreshIcon from '@mui/icons-material/Refresh';
import GraphSelect from './graph-select'
import { getAllStatistics, getAllWeeklyStatistics, getAllVisitationStatistics } from "../../services/admins/get";
import { TextField, Button } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Dashboard = () => {

    const [totalUserCount, setTotalUserCounte] = useState(0);
    const [totalActiveCases, setTotalActiveCases] = useState(0);
    const [totalRecoveredCases, setTotalRecoveredCases] = useState(0);
    const [totalNormalUsers, setTotalNormalUsers] = useState(0);

    const [totalUserCountToday, setTotalUserCounteToday] = useState(0);
    const [totalActiveCasesToday, setTotalActiveCasesToday] = useState(0);
    const [totalRecoveredCasesToday, setTotalRecoveredCasesToday] = useState(0);
    const [totalNormalUsersToday, setTotalNormalUsersToday] = useState(0);
    const [weeklyHeathAnalytics, setWeeklyHealthAnalytics] = useState([]);
    const [weeklyVisitationAnalytics, setWeeklyVisitationAnalytics] = useState([]);

    const [startDate, setStartDate] = useState(new Date());

    // graph selection state
    const [graphType, setgraphType] = React.useState('Line');
    const [graphType2, setgraphType2] = React.useState('Line');

    const handleChange = (event) => {
        setgraphType(event.target.value);
    };

    const handleChange2 = (event) => {
        setgraphType2(event.target.value);
    };

    const statisticsData = async () => {
        try {
            const data = await getAllStatistics();
            const consolidated = data.data;
            if(consolidated.success){
                setTotalUserCounte(consolidated.totalUserCount);
                setTotalActiveCases(consolidated.totalActiveCases);
                setTotalRecoveredCases(consolidated.totalRecoveredCases);
                setTotalNormalUsers(consolidated.totalNormalUsers);

                setTotalUserCounteToday(consolidated.userToday);
                setTotalActiveCasesToday(consolidated.positiveToday);
                setTotalRecoveredCasesToday(consolidated.recoveredToday);
                setTotalNormalUsersToday(consolidated.normalToday);
            }
        } catch (error) {
            
        }
    }

    const weeklyHealthStatusAnalytics =  async () => {
        try {
            const data = await getAllWeeklyStatistics(startDate.toISOString())
            setWeeklyHealthAnalytics(data.data.collectiveWeeklyHeatlhReport)
        } catch (error) {
            setWeeklyHealthAnalytics([])
        }
    }

    const weeklyVisitationStatusAnalytics =  async () => {
        try {
            const data = await getAllVisitationStatistics(startDate.toISOString())
            setWeeklyVisitationAnalytics(data.data.collectiveWeeklyHeatlhReport)
        } catch (error) {
            setWeeklyVisitationAnalytics([])
        }
    }

    useEffect(() => {
        statisticsData();
        weeklyHealthStatusAnalytics();
        weeklyVisitationStatusAnalytics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <HomeContainer>
            <Helmet>
                <title>JuanBreath | Dashboard</title>
            </Helmet>
            <h1 className='contentTitle'>Dashboard</h1>
            <p className='tableCaption'>Shows the over all covid count cases in the country and the accumulated count from the system's database.</p>
            <div className='count-container sum-boxes'>
                <div className='box1'>
                    <p className='box1-top-heading'>Total App Users</p>
                    <p className='box1-middle-heading'>{totalUserCount}</p>
                    <div className='d-flex justify-content-end'>
                        <p className='box1-bottom-heading'>+ {totalUserCountToday} Today</p>
                    </div>
                </div>
                <div className='box'>
                    <p className='box-top-heading'>Total Normal User</p>
                    <p className='box-middle-heading'>{totalNormalUsers + totalRecoveredCases}</p>
                    <div className='d-flex justify-content-end'>
                        <p className='box-bottom-heading'>+ {totalNormalUsersToday} Today</p>
                    </div>
                </div>  
                <div className='box'>
                    <p className='box-top-heading'>Total Positive Report</p>
                    <p className='box-middle-heading'>{totalActiveCases}</p>
                    <div className='d-flex justify-content-end'>
                        <p className='box-bottom-heading'>+ {totalActiveCasesToday} Today</p>
                    </div>
                </div>
                <div className='box'>
                    <p className='box-top-heading'>Total Recovered Report</p>
                    <p className='box-middle-heading'>{totalRecoveredCases}</p>
                    <div className='d-flex justify-content-end'>
                        <p className='box-bottom-heading'>+ {totalRecoveredCasesToday} Today</p>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "20px", width: "100%"}} className="box-statistics">
                <div style={{ marginBottom: "20px"}} className='d-flex justify-content-md-between'>
                    <h3 className='chartTitle'>Weekly Visitation Status Analytics</h3>
                    <div className='d-flex justify-content-md-between'>
                        <GraphSelect
                            graphType={graphType}
                            handleChange={handleChange}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                    weeklyVisitationStatusAnalytics();
                                }}
                                renderInput={(params) => <TextField size='small' style={{ marginLeft: "10px", width: "350px"}} {...params} />}
                            />
                        </LocalizationProvider>
                        <Button variant='contained' style={{ marginLeft: "10px" }} onClick={() => { weeklyVisitationStatusAnalytics()}}>
                            <RefreshIcon/>
                        </Button>
                    </div>
                </div>
                {
                    graphType === "Line" && 
                    <VisitationLineChart
                        weeklyHeathAnalytics={weeklyVisitationAnalytics}
                    />
                }
                {
                    graphType === "Bar" &&
                    <VisitationBarChart
                        weeklyHeathAnalytics={weeklyVisitationAnalytics}
                    />
                }
            </div>
            <div style={{ marginTop: "20px", width: "100%"}} className="box-statistics">
                <div style={{ marginBottom: "20px"}} className='d-flex justify-content-md-between'>
                    <h3 className='chartTitle'>Weekly Health Status Analytics</h3>
                    <div className='d-flex justify-content-md-between'>
                        <GraphSelect
                            graphType={graphType2}
                            handleChange={handleChange2}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                    weeklyHealthStatusAnalytics();
                                }}
                                renderInput={(params) => <TextField size='small' style={{ marginLeft: "10px", width: "350px"}} {...params} />}
                            />
                        </LocalizationProvider>
                        <Button variant='contained' style={{ marginLeft: "10px" }} onClick={() => { weeklyHealthStatusAnalytics()}}>
                            <RefreshIcon/>
                        </Button>
                    </div>
                </div>
                { 
                    graphType2 === "Line" && 
                    <WeeklyHealthStatusGraph
                        weeklyHeathAnalytics={weeklyHeathAnalytics}
                    />
                }
                { 
                    graphType2 === "Bar" && 
                    <WeeklyHealthBarStatusGraph
                        weeklyHeathAnalytics={weeklyHeathAnalytics}
                    />
                }
            </div>
        </HomeContainer>
        
    )
}

export default Dashboard