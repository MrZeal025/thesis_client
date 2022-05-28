import React, { useState, useEffect } from 'react'
import ChoropletMap from './ChoropletMap';

// components
import MapLoader from "./MapLoader";
import MapLegend from "./MapLegend";

// data
import { features } from "./data/countries.json";

export default function MainMap() {

    const [countries, setCountries] = useState([])

    const load = () => {
        setCountries(features);
    }

    useEffect(() => {
        load();
    }, []);
    return (
        <div>
            {
                countries.length === 0 
                ? 
                    <MapLoader/> 
                : 
                    <div>
                        <ChoropletMap
                            countries={countries}
                        />
                        <MapLegend />
                    </div>
            }
        </div>
    )
}
