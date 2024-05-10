import React, { useState } from 'react';
import RouteDetail from './RouteDetail';

const LeftContainer = (props) => {
    const nodeAddr = props.nodeAddr;
    const [showRouteDetail, setShowRouteDetail] = useState(false); // State to track visibility

    const toggleRouteDetail = () => {
        setShowRouteDetail(!showRouteDetail); // Toggle visibility
    };

    return (
        <div className="LeftContainer">
            <h2 style={{textAlign: "center"}}>예상 도착 시간은 99시 99분입니다</h2>

            <button onClick={toggleRouteDetail} style={{ float: 'right', marginRight: '20px' }}>Show/hide</button>
            {showRouteDetail && <RouteDetail nodeAddr={nodeAddr} />}
        </div>
    );
};

export default LeftContainer;
