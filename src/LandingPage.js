import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import LeftContainer from './LeftContainer';
import axios from 'axios';

function LandingPage() {
    const [nodeAddr, setNodeAddr] = useState([]);
    useEffect(() => {
        const nodeNames = [
            '서울특별시청',
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
            '북충주IC'
        ]
    
        axios.post('http://localhost:5000/get-node-info', {
            nodeNames: nodeNames
        })
        .then(response => {// 서버로부터 받은 데이터로 상태 업데이트
            setNodeAddr(response.data);
        })
        .catch(error => {
            console.error('Error fetching node info:', error);
        });
    }, []);

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: '1', width: '20%', backgroundColor: 'white' }}>
                <LeftContainer nodeAddr={nodeAddr} />
            </div>
            <div style={{ flex: '4', width: '80%', backgroundColor: 'lightblue' }}>
                <MapContainer nodeAddr={nodeAddr} />
            </div>
        </div>
    );
}

export default LandingPage;


// const nodeNames = [
    //   '반포IC',
    //   '서초IC',
    //   '양재IC',
    //   '금토JC',
    //   '대왕판교IC',
    //   '판교JC',
    //   '판교IC',
    //   '서울TG',
    //   '신갈JC',
    //   '마성IC',
    //   '서용인JCT',
    //   '용인IC',
    //   '양지IC',
    //   '덕평IC',
    //   '호법JC',
    //   '이천IC',
    //   '여주JC',
    //   '감곡IC',
    //   '충주JC',
    //   '북충주IC',
    //   '중앙탑Hi',
    //   '충주IC',
    //   '괴산IC',
    //   '연풍IC',
    //   '문경새재IC',
    //   '점촌함창IC',
    //   '북상주IC',
    //   '상주IC',
    //   '낙동JCT',
    //   '상주JCT',
    //   '도개IC',
    //   '서군위IC',
    //   '군위JCT',
    //   '동군위IC',
    //   '신녕IC',
    //   '화산JCT', 
    //   '동영천IC',
    //   '북안IC',
    //   '영천JCT',
    //   '건천IC', 
    //   '경주IC', 
    //   '활천IC', 
    //   '언양JC', 
    //   '서울산IC', 
    //   '서울주JC', 
    //   '통도사IC'
    // ];