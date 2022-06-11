import React, { useEffect, useState } from 'react';
import { MapContainer, Polygon, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getAllPositiveLogs } from '../../../services/positive-update-logs/get';
import { getAllDiseases } from '../../../services/diseases/get';
import { phLongLat } from './data/ph.js';

const markerIcon = (disease, data) => {
    if(data.length > 0) {
        const color = data.filter(data => { return data.name === disease})[0].color;
        return  L.divIcon({
            html: `<div class="marker-icon" style="background-color:${color || ""};"></div>`,
        });
    }
}

export default function ChoropletMap({ countries }) {

    const [data, setData] = useState([])
    const [monitoredDiseases, setMonitoredDiseases] = useState([])
    const [infectedLocationWithLongLat, setInfectedLocationWithLongLat] = useState([]);
    const [infectedCities, setInfectedCities] = useState([]);

    const _getAllMonitoredDiseases = async () => {
        try {
            const diseases = await getAllDiseases();
            setMonitoredDiseases(diseases.data?.data);
        } catch (error) {
            setMonitoredDiseases([])
        }
    }

    const getAllPositiveLogData = async () => {
        try {

            let rebuildedData = [];
            const data = await getAllPositiveLogs();
            const positiveLogs = data.data.data.filter(log => log.healthStatus === "Positive");

            for(let i = 0; i < positiveLogs.length; i++) {
                const { city } = positiveLogs[i];
                if(city.toLowerCase().includes("city")) {
                    rebuildedData.push(positiveLogs[i])
                }
                else {
                    rebuildedData.push({
                        ...positiveLogs[i],
                        city: `${city} city`
                    });
                }
            }

            const infectedLocationWithLongLat = phLongLat().filter((data) => {  
                return rebuildedData.some(log => {
                    return log.city.toLowerCase() === data.city.toLowerCase()
                })
            })

            for(let i = 0; i < rebuildedData.length; i++) {
                for(let j = 0; j < infectedLocationWithLongLat.length; j++) {
                    if(infectedLocationWithLongLat[j].city.toLowerCase() === rebuildedData[i].city.toLowerCase()) {
                        console.log()
                        rebuildedData[i].lng = Number(infectedLocationWithLongLat[j].lng);
                        rebuildedData[i].lat = Number(infectedLocationWithLongLat[j].lat);
                    }
                }
            }

            setInfectedLocationWithLongLat(rebuildedData)

            const infectedCities = data.data.data.filter(log => log.healthStatus === "Positive").map(item => item.city.toLowerCase());
            setInfectedCities([...new Set(infectedCities)]);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        _getAllMonitoredDiseases();
        setData(countries);
        getAllPositiveLogData();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <MapContainer
                style={{ height: "42vh", background: "rgb(79, 216, 255)" }}
                scrollWheelZoom={true}
                zoom={12.45}
                center={[14.644185110282999, 121.10195159912111]}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    monitoredDiseases.length > 0 && infectedLocationWithLongLat.map((data, index) => {
                        return (
                            <Marker 
                                key={index} 
                                position={[data.lat, data.lng]} 
                                icon={markerIcon(data.disease, monitoredDiseases)}
                            >    
                                <Popup>
                                    { data.city + " " + data.province }
                                </Popup>
                            </Marker>
                        )
                    })
                }
                {
                    data.map((state, i) => {
                        const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
                        return (<Polygon
                            key={i}
                            pathOptions={
                                infectedCities.includes(state.properties.NAME_2.toLowerCase())  ? 
                            {
                                fillColor: '#BD0026',
                                fillOpacity: 0.456,
                                weight: 2,
                                opacity: 1,
                                dashArray: 3,
                                color: 'white'
                            }: {
                                fillColor: '#FD8D3C',
                                fillOpacity: 0.456,
                                weight: 2,
                                opacity: 1,
                                dashArray: 3,
                                color: 'white'
                            }}
                            positions={coordinates}
                            eventHandlers={{
                                click: (e) => {
                                    console.log(e)
                                }
                            }}
                        />)
                    })
                }
            </MapContainer>
        </div>
    );
}