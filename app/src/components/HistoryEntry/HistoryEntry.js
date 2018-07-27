import React from 'react';
import './HistoryEntry.css';

const HistoryEntry = props => {
    // console.log("Invoked with props: " + JSON.stringify(props));
    let options;
    if (props.notFound === true) {
        options = <li>Not found</li>
    }
    else {
        options = props.results.map(result => (
                <li key={result.owner}>
                    {result.owner} owned this land till {new Date(result.timestamp).toString()}
                </li>
            )
        );
    }

    return <ul>{options}</ul>
};

export default HistoryEntry;