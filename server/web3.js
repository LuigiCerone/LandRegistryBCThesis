const Web3 = require('web3');
// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Example to test if it is working.
// web3.eth.getAccounts().then(console.log);

// Export default because it is the only thing exported.
module.exports = web3;
