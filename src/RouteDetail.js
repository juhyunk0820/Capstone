import React from 'react';

function RouteDetail({ nodeAddr }) {
    return (
        <div>
            <h2>Results</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {nodeAddr.map((node, index) => (
                    <li key={index} style={{ fontSize: '25px', color: 'black' }}>{node.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default RouteDetail;
