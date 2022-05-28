import React from 'react';
import Spinner from "react-bootstrap/Spinner"

const MapLoader = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner animation="grow" variant="primary"  />
            <Spinner animation="grow" variant="primary" style={{ marginLeft: "10px", marginRight: "10px" }}/>
            <Spinner animation="grow" variant="primary" />
        </div>
    );
}

export default MapLoader;
