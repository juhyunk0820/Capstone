import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import LeftContainer from './LeftContainer';
import Autocomplete from '../components/autocomplete';
import logo from '../images/Logo.png';
import axios from 'axios';
import './App.css';

const App = () => {
    const getCurrentTime = () => {
        const now = new Date();
        const kstOffset = 9 * 60 * 60 * 1000; // Offset in milliseconds
        const kstTime = new Date(now.getTime() + kstOffset);
        return kstTime.toISOString().substring(11, 16); // Format to HH:mm
    };

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState(getCurrentTime); // Get current time at initialization
    const [nodeAddr, setNodeAddr] = useState([]);
    const [eta, setEta] = useState('');
    const [path, setPath] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [map, setMap] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [mapKey, setMapKey] = useState(0);

    const handleSearch = () => {
        if (origin && destination && departureTime) {

            const start_point = origin;
            const end_point = destination;
            const start_time = departureTime;

            axios.post('http://34.47.71.145:5000/find_path', {
                start_point,
                end_point,
                start_time
            })
            .then(response => {
                const { eta, path, total_hours, total_minutes, total_seconds } = response.data;
                setEta(eta);
                setPath(path);
                setTotalHours(total_hours);
                setTotalMinutes(total_minutes);
                setTotalSeconds(total_seconds);

                return axios.post('http://34.47.71.145:5000/get-node-info', { path });
            })
            .then(response => {
                setNodeAddr(response.data);
                setMapKey(prevKey => prevKey + 1);
            })
            .catch(error => {
                console.error('Error fetching route info:', error);
                console.log('Loading stopped due to error');
            });
        } else {
            setErrorMessage('전부 입력하시고 검색눌러주세요');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000); // Hide error message after 3 seconds
        }
    };

    useEffect(() => {
        setDepartureTime(getCurrentTime()); // Set current time when component mounts
    }, []);

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
