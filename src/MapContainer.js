import React, { useEffect, useState } from 'react';
import directions from './directions';
import multiWaypoint from './multiWaypoint';
import makeMarkers from './makeMarkers';

const { kakao } = window;

const MapContainer = (props) => {
    const nodeAddr = props.nodeAddr;
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (typeof kakao !== 'undefined') {
            const container = document.getElementById('myMap');
            const options = {
                center: new kakao.maps.LatLng(36.321655, 127.378953),//초기 지도 중심 - 대전
                level: 12
            };
            const mapInstance = new kakao.maps.Map(container, options);
            setMap(mapInstance);
        }
    }, []);
    
    

    //#마커자동찍기
    useEffect(() => {
        if (map && nodeAddr && nodeAddr.length > 0) {
            makeMarkers(map, nodeAddr); 
            //multiWaypoint(map, nodeAddr); //자동경유지 길찾기 실행
            //directions(map, nodeAddr); //1대1 길찾기
            
        }
    }, [map, nodeAddr]);
    
        
    
    
    return (
        <div style={{ display: 'flex' }}>
            <div id='myMap'></div>
        </div>
    );
};

export default MapContainer;