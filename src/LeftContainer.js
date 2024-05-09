import React, { useState } from 'react';
import RouteDetail from './RouteDetail';

const LeftContainer = ({ onSearch }) => {
    const [nodeAddr, setNodeAddr] = useState([]);
    const [showRouteDetail, setShowRouteDetail] = useState(false); // State to track visibility

    const toggleRouteDetail = () => {
        setShowRouteDetail(!showRouteDetail); // Toggle visibility
    };

    return (
        <div className="LeftContainer">
            <button onClick={toggleRouteDetail}>Show/hide</button> {/* Button to toggle visibility */}
            {showRouteDetail && <RouteDetail nodeAddr={nodeAddr} />} {/* Render RouteDetail based on showRouteDetail state */}
        </div>
    );
};

export default LeftContainer;
