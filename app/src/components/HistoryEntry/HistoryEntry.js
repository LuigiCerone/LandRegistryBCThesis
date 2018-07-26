import React from 'react';
import './HistoryEntry.css';

const HistoryEntry = props => {
    const options = props.results.map(result => (
        <li key={result.id}>
            {result.name}
        </li>
    ));
    return <ul>{options}</ul>
};

export default HistoryEntry;