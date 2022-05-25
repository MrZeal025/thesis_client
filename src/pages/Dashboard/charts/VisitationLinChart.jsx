import React, { useState, useEffect } from 'react';
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
import  { getAllLocations } from "../../../services/locations/get";

const VisitationLineChart = ({ weeklyHeathAnalytics }) => {
    
    const [locations, setLocations] = useState([]);
    const colors = ["#2a749f", "#054164", "#30B8A6", "#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A", "#DFFF00", "#FFBF00", "#FF7F5", "#DE3163"]
    
    const _getAllLocation = async () => {
        try {
            const locations = await getAllLocations();
            setLocations(locations.data?.data);
        } catch (error) {
            setLocations([]);
        }
    }

    useEffect(() => {
        _getAllLocation();
    }, []);

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
                {
                     locations.length > 0 && locations.map((location, i) => {
                        return <Line key={i} type="monotone" dataKey={location.name} stroke={colors[i]}/>
                    })
                }
            </LineChart>
        </ResponsiveContainer>
    );
}

export default VisitationLineChart
