import React, { useState, useEffect } from 'react'
// css
import './dashboard.css'
// import package/s
import Helmet from 'react-helmet'
// component/s
import HomeContainer from '../../components/HomeContainer'
import { getAllStatistics } from "../../services/admins/get";
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {

    const [totalUserCount, setTotalUserCounte] = useState(0);
    const [totalActiveCases, setTotalActiveCases] = useState(0);
    const [totalRecoveredCases, setTotalRecoveredCases] = useState(0);
    const [totalNormalUsers, setTotalNormalUsers] = useState(0);

    const [totalUserCountToday, setTotalUserCounteToday] = useState(0);
    const [totalActiveCasesToday, setTotalActiveCasesToday] = useState(0);
    const [totalRecoveredCasesToday, setTotalRecoveredCasesToday] = useState(0);
    const [totalNormalUsersToday, setTotalNormalUsersToday] = useState(0);

    const data = [
  {
    date: 'May 16',
    Normal: 1,
    Positive: 5,
    Recovered: 10,
  },
  {
    date: 'May 17',
    Normal: 2,
    Positive: 2,
    Recovered: 0,
  },
  {
    date: 'May 18',
    Normal: 9,
    Positive: 2,
    Recovered: 0,
  },
  {
    date: 'May 19',
    Normal: 6,
    Positive: 1,
    Recovered: 5,
  },
  {
    date: 'May 20',
    Normal: 5,
    Positive: 2,
    Recovered: 14,
  },
  {
    date: 'May 21',
    Normal: 1,
    Positive: 0,
    Recovered: 1,
  },
  {
    date: 'May 22',
    Normal: 1,
    Positive: 7,
    Recovered: 15,
  },
];

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

    useEffect(() => {
        statisticsData();
    }, []);

    return (
        <HomeContainer>
            {/* Helmet for page's title*/}
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
                    <p className='box-middle-heading'>{totalNormalUsers}</p>
                    <div className='d-flex justify-content-end'>
                        <p className='box-bottom-heading'>+ {totalNormalUsersToday} Today</p>
                    </div>
                </div>  
                <div className='box'>
                    <p className='box-top-heading'>Total Positive Users</p>
                    <p className='box-middle-heading'>{totalActiveCases}</p>
                    <div className='d-flex justify-content-end'>
                        <p className='box-bottom-heading'>+ {totalActiveCasesToday} Today</p>
                    </div>
                </div>
                <div className='box'>
                    <p className='box-top-heading'>Total Recovered Users</p>
                    <p className='box-middle-heading'>{totalRecoveredCases}</p>
                    <div className='d-flex justify-content-end'>
                        <p className='box-bottom-heading'>+ {totalRecoveredCasesToday} Today</p>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "20px", width: "100%"}} className="box-statistics">
                <h3 className='chartTitle'>Health Status Analytics</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <LineChart
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Normal" stroke="grey"/>
                        <Line type="monotone" dataKey="Positive" stroke="red" />
                        <Line type="monotone" dataKey="Recovered" stroke="green" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </HomeContainer>
        
    )
}

export default Dashboard