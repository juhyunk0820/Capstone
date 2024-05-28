import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import LeftContainer from './LeftContainer';
import Autocomplete from '../components/autocomplete'; // Autocomplete 컴포넌트의 경로를 올바르게 수정해야 합니다.
import logo from '../images/Logo.png'; // 로고 이미지의 경로를 올바르게 수정해야 합니다.
import axios from 'axios';
import './App.css'; // App.css 파일을 import하여 스타일을 적용합니다.
import './loading.css';

const App = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState(() => {
        const now = new Date();
        return now.toISOString().substring(11, 16); // HH:mm 형식으로 현재 시간을 반환합니다.
    });
    const [nodeAddr, setNodeAddr] = useState([]);
    const [eta, setEta] = useState('');
    const [path, setPath] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [map, setMap] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false); // 로딩 상태 변수 추가
    const [mapKey, setMapKey] = useState(0);

    const handleSearch = () => {
        // 입력이 없을경우 
        if (!origin) setOrigin(null);
        if (!destination) setDestination(null);
        if (!departureTime) setDepartureTime(null);

        if (origin && destination && departureTime) {
            setLoading(true); // 로딩 시작

            // Mock response data
            const mockResponse = {
                "eta": "15시 41분",
                "path": [
                    "대전광역시청",
                    "유성IC",
                    "서대전JC",
                    "계룡IC",
                    "양촌Hi",
                    "논산IC",
                    "논산JC",
                    "익산IC",
                    "익산JC",
                    "삼례IC",
                    "전주IC",
                    "서전주IC",
                    "김제IC",
                    "금산사IC",
                    "태인IC",
                    "정읍IC",
                    "내장산IC",
                    "백양사IC",
                    "장성JC",
                    "장성IC",
                    "남장성JC",
                    "북광산IC",
                    "광산IC",
                    "산월IC",
                    "동림IC",
                    "서광주IC",
                    "광주광역시청"
                ],
                "total_hours": 3,
                "total_minutes": 41,
                "total_seconds": 19
            }
            // Use mock response data to set state
            setEta(mockResponse.eta);
            setPath(mockResponse.path);
            setTotalHours(mockResponse.total_hours);
            setTotalMinutes(mockResponse.total_minutes);
            setTotalSeconds(mockResponse.total_seconds);

            const nodeNames = mockResponse.path;

            setTimeout(() => {
                axios.post('http://34.47.71.145:4000/get-node-info', { nodeNames })
                    .then(response => {
                        setNodeAddr(response.data);
                        setMapKey(prevKey => prevKey + 1); // Update mapKey to reload MapContainer
                    })
                    .catch(error => {
                        console.error('Error fetching node info:', error);
                    })
                    .finally(() => {
                        setLoading(false); // 5초 후 로딩 종료
                    });
            }, 5000);
        } else {
            setErrorMessage('출발지, 목적지를 모두 입력해 주세요');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000); // 3초후 에러메세지 삭제
        }
    };

    return (
        <div className="App">
            <div className="LandingPage">
                <div className="Header">
                    <img src={logo} alt="로고" className="Logo" />
                </div>
                <div className="SearchBox">
                    <Autocomplete
                        placeholder="출발지를 입력하세요"
                        onSelectOption={setOrigin}
                        inputValue={origin}
                        setInputValue={setOrigin}
                    />
                    <Autocomplete
                        placeholder="도착지를 입력하세요"
                        onSelectOption={setDestination}
                        inputValue={destination}
                        setInputValue={setDestination}
                    />
                    <label htmlFor="appt-time">출발 시간 입력:</label>
                    <input
                        id="appt-time"
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                    />
                    <button className="SearchButton" onClick={handleSearch}>검색</button>
                    {showError && <div className="ErrorMessage">{errorMessage}</div>}
                    {loading && (
                        <div className="loading-container">
                            <div className="loading"></div>
                            <div id="loading-text">로딩 중...</div>
                        </div>
                    )}
                </div>
                <LeftContainer
                    nodeAddr={nodeAddr}
                    map={map}
                    eta={eta}
                    totalHours={totalHours}
                    totalMinutes={totalMinutes}
                    totalSeconds={totalSeconds}
                />
                <MapContainer key={mapKey} setMap={setMap} nodeAddr={nodeAddr} />
            </div>
        </div>
    );
};

export default App;
