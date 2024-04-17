import React, { useEffect } from 'react';
import ResultList from './ResultList';

const LeftContainer = ({ nodeAddr }) => {
    // nodeAddr 값이 변경될 때마다 실행되는 useEffect
    useEffect(() => {
    }, [nodeAddr]);

    return (
        <div id="js_route_search_detail" className="route_search_detail open" style={{ width: '30%' }}>
            <div className="route_search_detail_title" style={{ width: '150px' }}>구간 소통정보</div>
            <div className="route_search_detail_content">
                <div className="route_info"></div>
            </div>
            <ResultList nodeAddr={nodeAddr} />
        </div>
    );
};

export default LeftContainer;
