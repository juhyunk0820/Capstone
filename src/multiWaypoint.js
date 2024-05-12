const { kakao } = window;

const drawPolylineFromData = (map, data) => {
    data.routes.forEach(route => {
        route.sections.forEach(section => {
            section.roads.forEach(road => {
                const linePath = [];
                road.vertexes.forEach((vertex, index) => {
                    if (index % 2 === 0) {
                        linePath.push(new kakao.maps.LatLng(road.vertexes[index + 1], road.vertexes[index]));
                    }
                });

                const polyline = new kakao.maps.Polyline({
                    path: linePath,
                    strokeWeight: 5,
                    strokeColor: '#000000',
                    strokeOpacity: 0.4,
                    strokeStyle: 'solid'
                });

                polyline.setMap(map);
            });
        });
    });
};

const drawmulti = async (map, nodeAddr) => {
    const waypoints = [];
    for (let i = 1; i < nodeAddr.length - 1; i++) {
        const waypoint = {
            x: `${parseFloat(nodeAddr[i].lng)}`,
            y: `${parseFloat(nodeAddr[i].lat)}` 
        };
        waypoints.push(waypoint);
    }
    const origin = {
        x: `${parseFloat(nodeAddr[0].lng)}`,
        y: `${parseFloat(nodeAddr[0].lat)}`
        
    };
    const destination = {
        x: `${parseFloat(nodeAddr[nodeAddr.length - 1].lng)}`,
        y: `${parseFloat(nodeAddr[nodeAddr.length - 1].lat)}`
    };

    const url = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions';
    const REST_API_KEY = '7ac167a239af7e3b778713095534cb73';
    const headers = {
        'Authorization': `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json'
    };
    
    const requestData = {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        priority: 'RECOMMEND',
        car_fuel: 'GASOLINE',
        car_hipass: false,
        alternatives: false,
        road_details: false
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP 에러!!! Status: ${response.status}`);
        }

        const data = await response.json();

        drawPolylineFromData(map, data);
    } catch (error) {
        console.error('Error:', error);
    }
};

export default drawmulti;
