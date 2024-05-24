import { useEffect } from 'react';
const { kakao } = window;

const REST_API_KEY = '7ac167a239af7e3b778713095534cb73';

async function onlyorigindest(map, start, end) {
    const headers = {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json'
    };

    const origin = `${start.lng},${start.lat}`;
    const destination = `${end.lng},${end.lat}`;
    const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`;
    try {
        const response = await fetch(url, { method: 'GET', headers: headers });
        if (!response.ok) {
            throw new Error(`HTTP 에러!!! Status: ${response.status}`);
        }
        const data = await response.json();

        // 데이터에서 폴리라인 그리기 로직
        const linePath = data.routes[0].sections[0].roads.reduce((acc, curr) => {
            curr.vertexes.forEach((vertex, index) => {
                if (index % 2 === 0) {
                    acc.push(new kakao.maps.LatLng(curr.vertexes[index + 1], curr.vertexes[index]));
                }
            });
            return acc;
        }, []);
        
        const polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: '#00498c',
            strokeOpacity: 0.5,
            strokeStyle: 'solid'
        });
        
        polyline.setMap(map);
    } catch (error) {
        console.error('Error:', error);
    }
}

function straight(map, nodes) {
    const linePath = nodes.map(node => new kakao.maps.LatLng(node.lat, node.lng));
    const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#00498c',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
    });
    
    polyline.setMap(map);
}

async function drawRoutes(map, nodeAddr) {
    if (nodeAddr.length < 2) return;

    // 첫 번째~두 번째 구간
    await onlyorigindest(map, nodeAddr[0], nodeAddr[1]);

    // 마지막-1 ~ 마지막 구간
    await onlyorigindest(map, nodeAddr[nodeAddr.length - 2], nodeAddr[nodeAddr.length - 1]);

    // 중간 구간들
    for (let i = 1; i < nodeAddr.length - 2; i++) {
        const startNode = nodeAddr[i];
        const endNode = nodeAddr[i + 1];
        straight(map, [startNode, endNode]);
    }
}

export default drawRoutes;
