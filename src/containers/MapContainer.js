import React, { useEffect, useState } from 'react';
import drawRoutes from '../Component/drawRoutes';
import makeMarkers from '../Component/makeMarkers';

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
    
    

    //#마커자동찍기 & 길찾기 종류 4가지
    useEffect(() => {
        if (map && nodeAddr && nodeAddr.length > 0) {
            makeMarkers(map, nodeAddr); 
            drawRoutes(map,nodeAddr);
        }
    }, [map, nodeAddr]);
    
        
    
    
    return (
        <div>
            <div id='myMap'></div>
        </div>
    );
};

export default MapContainer;