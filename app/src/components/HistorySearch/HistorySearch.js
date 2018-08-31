import React from "react";
import './HistorySearch.css';
import HistoryEntry from '../HistoryEntry/HistoryEntry';


class HistorySearch extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            historyEntries: [],
            landId: '',
            notFound: false
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSearchChange(event) {
        this.setState({landId: event.target.value});
    }


    onSubmit(event) {
        event.preventDefault();
        if (this.state.landId && this.state.landId > 1) {
            this.getHistory(this.state.landId)
                .then((res) => {
                    if (res)
                        this.setState({historyEntries: res, notFound: false});
                    else
                        this.setState({historyEntries: [], notFound: true});
                })
                .catch((err) => this.setState({err: err}));
        }
    }

    async getHistory(landId) {

        // First we need to query the server in order to find the smart contract address.
        try {
            let response = await
                fetch('/rest/v1/getHistory?id=' + landId);
            if (!response.ok) {
                return null;
            } else
                return await response.json();
        } catch (error) {
            console.error("" + error);
        }
    }

    render() {
        return (
            <div id="getHistorySection">
                <h2>Get history</h2>
                <p>Search land by using its land id.</p>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <input type="number" value={this.state.landId} placeholder="landId"
                                   name="landId" className="form-control"
                                   onChange={this.onSearchChange} required/>
                        </div>
                        <div className="col-md-3 form-group">
                            <input type="submit" className="btn btn-primary" value="Get history"/>
                        </div>
                    </div>
                </form>
                <div>
                    <HistoryEntry results={this.state.historyEntries} notFound={this.state.notFound}/>
                </div>
            </div>
        );
    }
}

export default HistorySearch;