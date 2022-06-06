import React, { useEffect, useState } from 'react';
import { MapContainer, Polygon, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css";

export default function ChoropletMap({ countries }) {

    const [data, setData] = useState([])

    useEffect(() => {
        setData(countries);
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <MapContainer
                style={{ height: "45vh", background: "rgb(79, 216, 255)" }}
                scrollWheelZoom={false}
                zoom={13.25}
                center={[14.63992568739803, 121.10435485839845]}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    data.map((state, i) => {
                        const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
                        return (<Polygon
                            key={i}
                            pathOptions={{
                                fillColor: '#FD8D3C',
                                fillOpacity: 0.456,
                                weight: 2,
                                opacity: 1,
                                dashArray: 3,
                                color: 'white'
                            }}
                            positions={coordinates}
                            eventHandlers={{
                                mouseover: (e) => {
                                    const layer = e.target;
                                    layer.setStyle({
                                    dashArray: "",
                                    fillColor: "#BD0026",
                                    fillOpacity: 0.5,
                                    weight: 2,
                                    opacity: 1,
                                    color: "white",
                                    })
                                },
                                mouseout: (e) => {
                                    const layer = e.target;
                                    layer.setStyle({
                                    fillOpacity: 0.456,
                                    weight: 2,
                                    dashArray: "3",
                                    color: 'white',
                                    fillColor: '#FD8D3C'
                                    });
                                },
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