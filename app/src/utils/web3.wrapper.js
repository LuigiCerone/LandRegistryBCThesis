import Web3 from "web3";

let web3 = null;
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof  window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    // web3 = new Web3(web3.currentProvider);
    web3 = new Web3(window.web3.currentProvider);
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
} else {
    console.log('No web3? You should consider trying MetaMask!');
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

export default web3;