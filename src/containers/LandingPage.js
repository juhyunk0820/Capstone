import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import LeftContainer from './LeftContainer';
import axios from 'axios';
import Autocomplete from '../components/autocomplete'; // Updated import path for Autocomplete
import logo from '../images/Logo.png'; // Updated import path for the logo image

const LandingPage = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState(() => {
        const now = new Date();
        return now.toISOString().substring(11, 16); // Format to HH:mm
    });
    const [nodeAddr, setNodeAddr] = useState([]);
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
            const nodeNames = [
                origin, '반포IC', '서초IC', '양재IC', '금토JC', '대왕판교IC', '판교JC',
                '판교IC', '서울TG', '신갈JC', '마성IC', '서용인JCT', '용인IC', '양지IC',
                '덕평IC', '호법JC', '이천IC', '여주JC', '감곡IC', '충주JC', '북충주IC',
                '중앙탑Hi', '충주IC', '괴산IC', '연풍IC', '문경새재IC', '점촌함창IC',
                '북상주IC', '상주IC', '낙동JCT', '상주JCT', '도개IC', '서군위IC',
                '군위JCT', '동군위IC', '신녕IC', '화산JCT', '동영천IC', '북안IC',
                '영천JCT', '건천IC', '경주IC', '활천IC', '언양JC', '서울산IC',
                '서울주JC', '통도사IC', destination
            ];

            axios.post('http://34.47.71.145:5000/get-node-info', { nodeNames }) //gcp VM 중지 후 실행 될때마다 ip바뀜 잘 보기
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
            }, 3000); // Hide error message after 3 seconds
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
                <label htmlFor="appt-time">출발 시간 입력 : </label>
                <input
                    id="appt-time"
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                />
                <button className="SearchButton" onClick={handleSearch}>검색</button>
                {showError && <div className="ErrorMessage">{errorMessage}</div>}
            </div>
            <LeftContainer nodeAddr={nodeAddr} map={map} />
            <MapContainer key={mapKey} setMap={setMap} nodeAddr={nodeAddr} />
        </div>
    );
};

export default LandingPage;
