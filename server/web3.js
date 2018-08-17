const Web3 = require('web3');
// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(new Web3.providers.WebsocketProvider('http://localhost:8545'));
// const web3 = new Web3(Web3.givenProvider);

module.exports = web3;
