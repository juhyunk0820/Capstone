// LandingPage.js
import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import LeftContainer from './LeftContainer';
import axios from 'axios';
import Autocomplete from '../components/autocomplete';

const LandingPage = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [nodeAddr, setNodeAddr] = useState([]);
    const [mapKey, setMapKey] = useState(0); // 새로운 키 상태 추가

    
    const handleSearch = () => {
        if (origin && destination) {
            const nodeNames = [
                    origin,
                    '반포IC',
                    '서초IC',
                    '양재IC',
                    '금토JC',
                    '대왕판교IC',
                    '판교JC',
                    '판교IC',
                    '서울TG',
                    '신갈JC',
                    '마성IC',
                    '서용인JCT',
                    '용인IC',
                    '양지IC',
                    '덕평IC',
                    '호법JC',
                    '이천IC',
                    '여주JC',
                    '감곡IC',
                    '충주JC',
                    '북충주IC',
                    '중앙탑Hi',
                    '충주IC',
                    '괴산IC',
                    '연풍IC',
                    '문경새재IC',
                    '점촌함창IC',
                    '북상주IC',
                    '상주IC',
                    '낙동JCT',
                    '상주JCT',
                    '도개IC',
                    '서군위IC',
                    '군위JCT',
                    '동군위IC',
                    '신녕IC',
                    '화산JCT', 
                    '동영천IC',
                    '북안IC',
                    '영천JCT',
                    '건천IC', 
                    '경주IC', 
                    '활천IC', 
                    '언양JC', 
                    '서울산IC', 
                    '서울주JC', 
                    '통도사IC',
                    destination
                    ];
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
                    onSelectOption={setOrigin} 
                />
                <Autocomplete
                    placeholder="도착지를 입력하세요"
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
