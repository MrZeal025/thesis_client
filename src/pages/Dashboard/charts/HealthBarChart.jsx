import React from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

const WeeklyHealthBarStatusGraph = ({ weeklyHeathAnalytics }) => {
    return (
        <ResponsiveContainer width="100%" aspect={4 / 1}>
            <BarChart
                data={weeklyHeathAnalytics}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar type="monotone" dataKey="New User" stroke="#2a749f" fill="#2a749f"/>
                <Bar type="monotone" dataKey="Positive" stroke="#CD5C5C" fill="#CD5C5C" />
                <Bar type="monotone" dataKey="Recovered" stroke="#30B8A6" fill="#30B8A6" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default WeeklyHealthBarStatusGraph
