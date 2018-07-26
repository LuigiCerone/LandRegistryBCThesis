import React from 'react';
import './HistoryEntry.css';

const HistoryEntry = props => {
    const options = props.results.map(result => (
        <li key={result.owner}>
            {result.owner} owned this land till {new Date(result.timestamp)}
        </li>
    ));
    return <ul>{options}</ul>
};

export default HistoryEntry;