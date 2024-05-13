const { kakao } = window;

async function directions(map, nodeAddr) {
    const REST_API_KEY = '7ac167a239af7e3b778713095534cb73';
    const headers = {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json'
    };
    
    for (let i = 0; i < nodeAddr.length - 1; i++) {
        const origin = `${nodeAddr[i].lng},${nodeAddr[i].lat}`;
        const destination = `${nodeAddr[i + 1].lng},${nodeAddr[i + 1].lat}`;
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
                strokeColor: '#0000FF',
                strokeOpacity: 0.4,
                strokeStyle: 'strokeStyle'
            });
            
            polyline.setMap(map);
        } catch (error) {
            console.error('Error:', error);
        }

    }
    
};

export default directions;