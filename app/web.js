import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

// Example to test if it is working.
web3.eth.getAccounts().then(console.log);

// Export default because it is the only thing exported.
export default web3;
