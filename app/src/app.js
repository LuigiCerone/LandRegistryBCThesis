import React from "react";
import ReactDOM from "react-dom";
import AddLand from './components/AddLand/AddLand';
import HistorySearch from './components/HistorySearch/HistorySearch';

import web3 from './web3.wrapper';
import SearchLand from "./components/SearchLand/SearchLand";
import TransferLand from "./components/TransferLand/TransferLand";

let addresses;
web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];
    console.log("Default account is: " + web3.eth.defaultAccount);
    addresses = accounts;
}).catch((err) => console.log(err));

ReactDOM.render(
    <div>
        <AddLand/>
        <HistorySearch/>
        <SearchLand/>
        <TransferLand/>
    </div>,
    document.getElementById("app"));