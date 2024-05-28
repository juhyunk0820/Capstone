const { kakao } = window;

const REST_API_KEY = '7ac167a239af7e3b778713095534cb73';

async function fetchRouteData(start, end) {
    const headers = {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json'
    };

    const origin = `${start.lng},${start.lat}`;
    const destination = `${end.lng},${end.lat}`;
    const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`;

    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
        throw new Error(`HTTP Error: Status ${response.status}`);
    }
    return await response.json();
}

function createPolyline(map, linePath, options = {}) {
    const defaultOptions = {
        strokeWeight: 5,
        strokeColor: '#00498c',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
        path: linePath
    };

    const polyline = new kakao.maps.Polyline({ ...defaultOptions, ...options });
    polyline.setMap(map);
}

async function onlyorigindest(map, start, end) {
    try {
        const data = await fetchRouteData(start, end);

        const linePath = data.routes[0].sections[0].roads.reduce((acc, curr) => {
            curr.vertexes.forEach((vertex, index) => {
                if (index % 2 === 0) {
                    acc.push(new kakao.maps.LatLng(curr.vertexes[index + 1], curr.vertexes[index]));
                }
            });
            return acc;
        }, []);

        createPolyline(map, linePath, { strokeOpacity: 0.6 });
    } catch (error) {
        console.error('Error fetching route data:', error);
    }
}

function straight(map, nodes) {
    const linePath = nodes.map(node => new kakao.maps.LatLng(node.lat, node.lng));
    createPolyline(map, linePath);
}

async function drawRoutes(map, nodeAddr) {
    if (nodeAddr.length < 2) return;

    await onlyorigindest(map, nodeAddr[0], nodeAddr[1]);
    await onlyorigindest(map, nodeAddr[nodeAddr.length - 2], nodeAddr[nodeAddr.length - 1]);

    for (let i = 1; i < nodeAddr.length - 2; i++) {
        straight(map, [nodeAddr[i], nodeAddr[i + 1]]);
    }
}

export default drawRoutes;