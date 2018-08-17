import React from 'react';
import './LandEntry.css';

const LandEntry = props => {
    console.log("Invoked with props: " + JSON.stringify(props));
    let options;
    if (props.notFound === true) {
        options = <li>No lands associated to this account.</li>
    }
    else {
        options = props.results.map(result => (
                <li key={result.landParcel + result.subaltern}>
                    <h3>Land info:</h3>
                    <p>District: {result.district}<br/>
                        Document: {result.document}<br/>
                        Parcel: {result.landParcel}<br/>
                        Subaltern: {result.subaltern}</p>
                </li>
            )
        );
    }

    return <ul>{options}</ul>
};

export default LandEntry;