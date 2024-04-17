import React, { useEffect, useState } from 'react';
import drawPath from './drawpath';
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
                center: new kakao.maps.LatLng(37.526362213, 127.028476085), // 초기 센터 압구정역 좌표
                level: 12
            };
            const mapInstance = new kakao.maps.Map(container, options);
            setMap(mapInstance);
        }
    }, []);
    
    

    //#마커자동찍기
    useEffect(() => {
        makeMarkers(map, nodeAddr); 
        
    }, [map, nodeAddr]);
    
    
        // #1대1 경로 그리기 함수
        // const handleDrawPath = () => {
        //     if (map && nodeAddr) {
        //         for (let i = 0; i < nodeAddr.length - 1; i++) {
        //             const originLat = nodeAddr[i].lat;
        //             const originLng = nodeAddr[i].lng;
        //             const destinationLat = nodeAddr[i + 1].lat;
        //             const destinationLng = nodeAddr[i + 1].lng;
            
        //             // lat과 lng를 쉼표로 구분된 문자열로 변환
        //             const origin = `${originLng},${originLat}`;
        //             const destination = `${destinationLng},${destinationLat}`;
            
        //             drawPath(map, origin, destination);
        //         }
        //     }
        // };
    

    // //다중경유지 그리기
    const handleDrawPath = () => {
        if (map && nodeAddr) {
            const waypoints = [];
            for (let i = 1; i < nodeAddr.length - 1; i++) {
                const waypoint = {
                    y: nodeAddr[i].lat, // 위도와 경도는 문자열로 제공되므로 숫자로 변환해야 합니다.
                    x: nodeAddr[i].lng
                };
                waypoints.push(waypoint);
            }
            const origin = {
                y: nodeAddr[0].lat,
                x: nodeAddr[0].lng
            };
            const destination = {
                y: nodeAddr[nodeAddr.length - 1].lat,
                x: nodeAddr[nodeAddr.length - 1].lng
            };
            multiWaypoint(map, origin, destination, waypoints);
        }
    };
    
    return (
        <div style={{ display: 'flex' }}>
            <div id='myMap' style={{ width: '80%', height: '950px' }}></div>
            <button onClick={handleDrawPath}>Draw Path</button>
        </div>
    );
};

export default MapContainer;
