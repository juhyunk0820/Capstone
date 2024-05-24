import img from '../images/marker.png';
const { kakao } = window;

function makeMarkers(map, coordinates) {
    const firstMarker = coordinates[0];
    const lastMarker = coordinates[coordinates.length - 1];

    coordinates.forEach((coord, index) => {
        const lat = parseFloat(coord.lat);
        const lng = parseFloat(coord.lng);
        
        //별도의 마커 설정
        const imageSrc = img; // 마커이미지의 주소입니다    
        const imageSize = new kakao.maps.Size(20, 20);
        const imageOption = { offset: new kakao.maps.Point(10, 15) };

        // 첫 번째와 마지막 마커에만 이미지 적용
        
        if (coord !== firstMarker && coord !== lastMarker) {
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        }
        else{
            markerImage = null;
        }
        
        // 마커 생성
        const marker = new kakao.maps.Marker({
            name: coord.name,
            position: new kakao.maps.LatLng(lat, lng),
            map: map,
            image:  markerImage
        });

        //커스텀오버레이의 내용
        var content =   `<div class="customoverlay">
                            <span class="title">${coord.name}</span>
                        </div>`;

        var customOverlay  = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(lat, lng),
            content: content,
            yAnchor: 0,
        });
        
        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, 'mouseover', function() {
            customOverlay.setMap(map);
        });

        kakao.maps.event.addListener(marker, 'mouseout', function() {
            customOverlay.setMap(null);   
        });
        
    });
}

export default makeMarkers;