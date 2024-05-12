const { kakao } = window;

async function straight(map, nodeAddr) {

// nodeAddr 배열을 사용하여 linePath 배열을 생성합니다
    var linePath = nodeAddr.map(function(node) {
        return new kakao.maps.LatLng(node.lat, node.lng);
    });
    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: '#FF0000', // 선의 색깔입니다
        strokeOpacity: 0.4, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    });
    
    // 지도에 선을 표시합니다 
    polyline.setMap(map);

    
};

export default straight;