import React from "react";
import "SearchLand.css";
import LandEntry from "../LandEntry/LandEntry";


class SearchLand extends React.Component {

    constructor(props) {
        super(props);

        // Init of state vars.
        this.setState({address: '', landEntries: []});


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
            this.getLandsForAccount(this.state.landId)
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
            <form onSubmit={this.onSubmit}>
                <h2>Get land for address</h2>
                <input type="number" value={this.state.address} placeholder="Address" name="address"
                       onChange={this.onSearchChange} required/>
                <input type="submit" value="Get lands"/>
                <LandEntry results={this.state.historyEntries} notFound={this.state.notFound}/>
            </form>
        );
    }
}

export default SearchLand;