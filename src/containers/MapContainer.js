import React, { useEffect, useState } from 'react';
import drawRoutes from '../components/drawRoutes';
import makeMarkers from '../components/makeMarkers';

const { kakao } = window;

const MapContainer = ({ setMap, nodeAddr }) => {
    const [map, setLocalMap] = useState(null);

    useEffect(() => {
        if (typeof kakao !== 'undefined') {
            const container = document.getElementById('myMap');
            const options = {
                center: new kakao.maps.LatLng(36.321655, 127.378953), // 초기 지도 중심 - 대전
                level: 12
            };
            const mapInstance = new kakao.maps.Map(container, options);
            setLocalMap(mapInstance); // Set the local map instance
            setMap(mapInstance); // Pass the map instance to the parent component
        }
    }, [setMap]);

    useEffect(() => {
        if (map && nodeAddr && nodeAddr.length > 0) {
            makeMarkers(map, nodeAddr);
            drawRoutes(map, nodeAddr);
        }
    }, [map, nodeAddr]);

    return (
        <div>
            <div id='myMap' ></div>
        </div>
    );
};

export default MapContainer;
