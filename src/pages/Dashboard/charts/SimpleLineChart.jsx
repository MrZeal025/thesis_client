import React from 'react';
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

const WeeklyHealthStatusGraph = ({ weeklyHeathAnalytics }) => {
    return (
        <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart
                data={weeklyHeathAnalytics}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="New User" stroke="grey"/>
                <Line type="monotone" dataKey="Positive" stroke="red" />
                <Line type="monotone" dataKey="Recovered" stroke="green" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default WeeklyHealthStatusGraph
