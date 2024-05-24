import React, { useState } from 'react';

const LeftContainer = ({ nodeAddr, map }) => {
    const [showRouteDetail, setShowRouteDetail] = useState(false); // State to track visibility

    const toggleRouteDetail = () => {
        setShowRouteDetail(!showRouteDetail); // Toggle visibility
    };

    const setCenter = (lat, lng) => {
        if (window.kakao && map) {
            const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
            map.setCenter(moveLatLon);
            map.setLevel(7);
        }
    };

    return (
        <div className="LeftContainer">
            <h2 style={{ textAlign: "center" }}>예상 도착 시간은 99시 99분입니다</h2>

            <button onClick={toggleRouteDetail} style={{ float: 'right', marginRight: '20px' }}>Show/hide</button>
            {showRouteDetail && (
                <div className='RouteDetailComponent'>
                    <h2>경로</h2>
                    <ul className="ordered-nav">
                        {nodeAddr.map((node, index) => (
                            <li key={index} className="ordered-nav--link" onClick={() => setCenter(node.lat, node.lng)}>
                                <span className="tx-link">{node.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LeftContainer;
