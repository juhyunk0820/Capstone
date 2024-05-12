// LandingPage.js
import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import LeftContainer from './LeftContainer';
import axios from 'axios';
import Autocomplete from './autocomplete';
const dataList = [
    '서울특별시청',
    '인천광역시청',
    '대전광역시청',
    '광주광역시청',
    '대구광역시청',
    '부산광역시청',
    '울산광역시청',
    '인천공항제2여객터미널'
];
const LandingPage = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [nodeAddr, setNodeAddr] = useState([]);
    const [mapKey, setMapKey] = useState(0); // 새로운 키 상태 추가

    
    const handleSearch = () => {
        const nodeNames = [
            '서울특별시청',
            '반포IC',
            '서초IC',
            '양재IC'
        ];
        if (origin && destination) {
            axios.post('http://localhost:5000/get-node-info', {
                nodeNames: nodeNames
            })
            .then(response => {
                setNodeAddr(response.data);
                setMapKey(prevKey => prevKey + 1); // 키 업데이트
            })
            .catch(error => {
                console.error('Error fetching node info:', error);
            });
        }
    };

    return (
        <div>
            <div className='Header'>
                <h2 className='Logo'>로고</h2>
            </div>
            <div className="SearchBox">
            <Autocomplete
                placeholder="출발지를 입력하세요"
                dataList={dataList}
                onSelectOption={setOrigin} 
            />
            <Autocomplete
                placeholder="도착지를 입력하세요"
                dataList={dataList}
                onSelectOption={setDestination}
            />
                <button className='SearchButton' onClick={handleSearch}>검색</button>
            </div>
            <div>
                <LeftContainer nodeAddr={nodeAddr}/> {/* Pass setNodeAddr as a prop */}
            </div>
            <div key={mapKey}>
                <MapContainer nodeAddr={nodeAddr} /> {/* Pass nodeAddr as a prop */}
            </div>
        </div>
    );
};

export default LandingPage;
