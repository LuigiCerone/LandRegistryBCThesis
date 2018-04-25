var Web3 = require('web3');

let web3 = window.web3;

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider)
	console.log('Injected web3 detected!');	
} else {
	// set the provider you want from Web3.providers.
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	console.log('No web3 instance injected, using Local web3.');
}
exports.web3 = web3;