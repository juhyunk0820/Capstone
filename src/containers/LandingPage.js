import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import LeftContainer from './LeftContainer';
import Autocomplete from '../components/autocomplete'; // Updated import path for Autocomplete
import logo from '../images/Logo.png'; // Updated import path for the logo image
import axios from 'axios';

const LandingPage = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState(() => {
        const now = new Date();
        return now.toISOString().substring(11, 16); // Format to HH:mm
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
    const [mapKey, setMapKey] = useState(0); // Key state for MapContainer

    const handleSearch = () => {
        // Set to null if input is empty
        if (!origin) setOrigin(null);
        if (!destination) setDestination(null);
        if (!departureTime) setDepartureTime(null);

        if (origin && destination && departureTime) {
            // Mock response data
            const mockResponse = {
                eta: "04시 23분",
                path: [
                    "서울특별시청",
                    "한남IC",
                    "잠원IC",
                    "반포IC",
                    "서초IC",
                    "양재IC",
                    "금토JC",
                    "대왕판교IC",
                    "판교JC",
                    "판교IC",
                    "서울TG",
                    "신갈JC",
                    "마성IC",
                    "서용인JC",
                    "용인IC",
                    "양지IC",
                    "덕평IC",
                    "호법JC",
                    "이천IC",
                    "여주JC",
                    "감곡IC",
                    "충주JC",
                    "북충주IC",
                    "중앙탑Hi",
                    "충주IC",
                    "괴산IC",
                    "연풍IC",
                    "문경새재IC",
                    "점촌함창IC",
                    "북상주IC",
                    "상주IC",
                    "낙동JC",
                    "선산IC",
                    "김천JC",
                    "북구미하이패스IC",
                    "구미IC",
                    "남구미IC",
                    "왜관IC",
                    "칠곡물류IC",
                    "칠곡JC",
                    "금호JC",
                    "서대구TG",
                    "대구광역시청",
                    "동대구IC",
                    "수성IC",
                    "청도IC",
                    "밀양JC",
                    "밀양IC",
                    "남밀양IC",
                    "삼랑진IC",
                    "상동IC",
                    "대동JC",
                    "대감JC",
                    "대동IC",
                    "초정IC",
                    "대저JC",
                    "덕천IC",
                    "부산광역시청"
                ],
                total_hours: 16,
                total_minutes: 23,
                total_seconds: 24
            };

            // Use mock response data to set state
            setEta(mockResponse.eta);
            setPath(mockResponse.path);
            setTotalHours(mockResponse.total_hours);
            setTotalMinutes(mockResponse.total_minutes);
            setTotalSeconds(mockResponse.total_seconds);

            const nodeNames = mockResponse.path;

            axios.post('http://34.47.71.145:4000/get-node-info', { nodeNames })
                .then(response => {
                    setNodeAddr(response.data);
                    setMapKey(prevKey => prevKey + 1); // Update mapKey to reload MapContainer
                })
                .catch(error => {
                    console.error('Error fetching node info:', error);
                });

        } else {
            setErrorMessage('전부 입력하시고 검색눌러주세요');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000); // 3초후 에러메세지 삭제
        }
    };

    return (
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
    );
};

export default LandingPage;
