import React from "react";
import ReactDOM from "react-dom";
import AddLand from './AddLand';
import web3 from './web3.wrapper';

let addresses;
web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];
    console.log("Default account is: " + web3.eth.defaultAccount);
    addresses = accounts;
}).catch((err) => console.log(err));

ReactDOM.render(<AddLand/>, document.getElementById("app"));