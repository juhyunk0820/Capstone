// LandingPage.js
import React, { useState } from 'react';
import MapContainer from './MapContainer';
import LeftContainer from './LeftContainer';

const LandingPage = () => {
    const [nodeAddr, setNodeAddr] = useState([]);

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: '1', width: '20%', backgroundColor: 'white' }}>
                <LeftContainer setNodeAddr={setNodeAddr} /> {/* Pass setNodeAddr as a prop */}
            </div>
            <div style={{ flex: '4', width: '80%', backgroundColor: 'lightblue' }}>
                <MapContainer nodeAddr={nodeAddr} /> {/* Pass nodeAddr as a prop */}
            </div>
        </div>
    );
};

export default LandingPage;
