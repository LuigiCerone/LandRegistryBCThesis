import React from "react";
import "./SearchLand.css";
import LandEntry from "../LandEntry/LandEntry";

import ReactTable from "react-table";
import 'react-table/react-table.css'


class SearchLand extends React.Component {

    constructor(props) {
        super(props);

        // Init of state vars.
        this.state = {address: '', landEntries: []};

        // Methods binding.
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSearchChange(event) {
        this.setState({address: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.address && this.state.address > 1) {
            this.getLandsForAccount(this.state.address)
                .then((res) => {
                    if (res)
                        this.setState({landEntries: res, notFound: false});
                    else
                        this.setState({landEntries: [], notFound: true});
                })
                .catch((err) => this.setState({err: err}));
        }
    }

    async getLandsForAccount(addressToSearchFor) {

        // We need to query the server in order to get the lands' list.
        try {
            let response = await
                fetch('/rest/v1/getLandsForAddress?addr=' + addressToSearchFor);
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
            <div id="getLandsSection">
                <h2>Get land for address</h2>
                <p>Return all the lands associated with a given address.</p>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="row">
                        <div className="col-md-9 form-group">
                            <input type="text" className="form-control" value={this.state.address} placeholder="Address"
                                   name="address"
                                   onChange={this.onSearchChange} required/>
                        </div>
                        <div className="col-md-3 form-group">
                            <input type="submit" className="btn btn-primary" value="Get lands"/>
                        </div>
                    </div>
                </form>
                <div>
                    <ReactTable data={this.state.landEntries} columns={[
                        {
                            Header: 'Land Parcel',
                            accessor: 'landParcel'
                        },
                        {
                            Header: 'Subaltern',
                            accessor: 'subaltern'
                        },
                        {
                            Header: 'District',
                            accessor: 'district'
                        },
                        {
                            Header: 'Document',
                            accessor: 'document'
                        }
                    ]}
                                defaultPageSize={5}
                                className="-striped -highlight"/>
                    {/*<LandEntry results={this.state.landEntries} notFound={this.state.notFound}/>*/}
                </div>
            </div>
        );
    }
}

export default SearchLand;