// LeftContainer.js
import React, { useState } from 'react';
import axios from 'axios';

const LeftContainer = ({ setNodeAddr }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    const handleSearch = () => {
        const nodeNames = [
            '서울특별시청',
            '반포IC',
            '서초IC'
        ];
        if (origin && destination) {
            axios.post('http://localhost:5000/get-node-info', {
                nodeNames: nodeNames
            })
            .then(response => {
                setNodeAddr(response.data);
            })
            .catch(error => {
                console.error('Error fetching node info:', error);
            });
        }
    };

    return (
        <div id="js_route_search_detail" className="route_search_detail open" style={{ width: '30%' }}>
            <div className="search">
                <input
                    type="text"
                    placeholder="출발지"
                    value={origin}
                    onChange={(event) => setOrigin(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="도착지"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <div className="route_search_detail_content">
                <div className="route_info"></div>
            </div>
        </div>
    );
};

export default LeftContainer;
