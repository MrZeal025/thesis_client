import React, { Fragment } from 'react';

const MapLegend = () => {
    return (
        <Fragment>
                <h6  style={{ marginTop: "5px"}}><b>Legend:</b></h6>
                <div className='d-flex'>
                    <div className='d-flex' style={{ marginRight: "10px"}}>
                        <div className='box-legend-red'></div>
                        <p style={{ marginBottom: "0px", fontSize: "12px"}}><b>Areas with reported cases</b></p>
                    </div>
                    <div className='d-flex'>
                        <div className='box-legend-green'></div>
                        <p style={{ marginBottom: "0px", fontSize: "12px"}}><b>Areas with no reported cases</b></p>
                    </div>
                </div>
        </Fragment>
    );
}

export default MapLegend;
