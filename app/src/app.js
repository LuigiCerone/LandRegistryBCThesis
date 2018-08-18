import React from "react";
import ReactDOM from "react-dom";
import AddLand from './components/AddLand/AddLand';
import HistorySearch from './components/HistorySearch/HistorySearch';

import web3 from './utils/web3.wrapper';
import SearchLand from "./components/SearchLand/SearchLand";
import TransferLand from "./components/TransferLand/TransferLand";

import "../dist/css/reset.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "../dist/css/app.css";


let addresses;
web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];
    console.log("Default account is: " + web3.eth.defaultAccount);
    addresses = accounts;
}).catch((err) => console.log(err));

ReactDOM.render(
    <div>
        <AddLand/>
        <hr/>
        <HistorySearch/>
        <hr/>
        <SearchLand/>
        <TransferLand/>
    </div>
    ,
    document.getElementById("app"));