const { kakao } = window;

function makeMarkers(map, coordinates) {
    const firstMarker = coordinates[0];
    const lastMarker = coordinates[coordinates.length - 1];

    coordinates.forEach((coord, index) => {
        const lat = parseFloat(coord.lat);
        const lng = parseFloat(coord.lng);
        
        // 별도의 마커 설정
        // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'; // 마커이미지의 주소입니다    
        // const imageSize = new kakao.maps.Size(30, 40);
        // const imageOption = { offset: new kakao.maps.Point(0, 30) };
        // let markerImage = null;

        // // 첫 번째와 마지막 마커에만 이미지 적용
        
        // if (coord === firstMarker || coord === lastMarker) {
        //     markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        // }
        
        // 마커 생성
        const marker = new kakao.maps.Marker({
            name: coord.name,
            position: new kakao.maps.LatLng(lat, lng),
            map: map
        });

        // 인포윈도우 생성
        const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="text-align: center; color: black; font-size: 20px;">${index+1}번째 ${coord.name}</div>` // 인포윈도우에 표시할 내용
        });
        
        

        // 마커에 마우스 이벤트 등록
        kakao.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map, marker); // 마커 위에 인포윈도우 표시
        });

        kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close(); // 마커에서 마우스가 벗어나면 인포윈도우 닫기
        });
    });
}

export default makeMarkers;