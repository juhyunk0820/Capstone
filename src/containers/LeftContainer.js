import React, { useState } from 'react';
const { kakao } = window;

const LeftContainer = ({ nodeAddr, map, eta, totalHours, totalMinutes, totalSeconds }) => {
    const [showRouteDetail, setShowRouteDetail] = useState(false); // State to track visibility

    const toggleRouteDetail = () => {
        setShowRouteDetail(!showRouteDetail); // Toggle visibility
    };

    const setCenter = (lat, lng) => {
        if (kakao && map) {
            const moveLatLon = new kakao.maps.LatLng(lat, lng);
            map.setCenter(moveLatLon);
            map.setLevel(8);
        }
    };

    return (
        <div className="LeftContainer">
            <h2 style={{ textAlign: "center" }}>예상 도착 시간은 {eta}입니다</h2>
            <h4 style={{ textAlign: "center" }}>총 여행 시간: {totalHours}시간 {totalMinutes}분 {totalSeconds}초</h4>

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
