import React from 'react';

function RouteDetail({ nodeAddr }) {
    return (
        <div>
            
            <ul className='RouteDetailComponent' style={{ listStyle: 'none', padding: 0 }}>
                <h2>Results</h2>
                {nodeAddr.map((node, index) => (
                    <li key={index}>{node.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default RouteDetail;
