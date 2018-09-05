import React from 'react';
import './HistoryEntry.css';

const HistoryEntry = props => {
    // console.log("Invoked with props: " + JSON.stringify(props));
    let options;
    // TODO Mettere intervallo di date sul possesso.
    if (props.notFound === true) {
        options =
            <div className="card">
                <div className="card-header">
                    Not found
                </div>
                <div className="card-body">
                    <p className="card-text"> The land you are searching for is not in the system.</p>
                </div>
            </div>
    }
    else {
        options = props.results.map((item, index) => {
                // console.log(index);
                if (index === props.results.length - 1) {
                    return (
                        <div className="card" key={item.timestamp}>
                            <div className="card-header">
                                Owner's address is: {item.owner}
                            </div>
                            <div className="card-body">
                                <p className="card-text">  {item.owner} owns this land.</p>
                            </div>
                        </div>
                    )
                } else
                    return (
                        <div className="card" key={item.timestamp}>
                            <div className="card-header">
                                Owner's address is: {item.owner}
                            </div>
                            <div className="card-body">
                                <p className="card-text">  {item.owner} owned this land
                                    till {new Date(item.timestamp).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )
            }
        );
    }


    return options;
};

export default HistoryEntry;

