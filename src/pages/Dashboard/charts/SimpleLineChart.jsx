import React from 'react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

const WeeklyHealthStatusGraph = ({ weeklyHeathAnalytics }) => {
    return (
        <ResponsiveContainer width="100%" aspect={4 / 1}>
            <AreaChart
                data={weeklyHeathAnalytics}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="New User" stroke="#2a749f" fill="#2a749f"/>
                <Area type="monotone" dataKey="Positive" stroke="#CD5C5C" fill="#CD5C5C" />
                <Area type="monotone" dataKey="Recovered" stroke="#30B8A6" fill="#30B8A6" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default WeeklyHealthStatusGraph
