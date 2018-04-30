import web3 from './web3';

// web3.eth.getAccounts().then(console.log);
import unity_abi from 'CompiledContracts/Unity.json';

// Setup of defaultAccount.
web3.eth.getAccounts().then((accounts) => {
	web3.eth.defaultAccount = accounts[0];
	start();
}).catch((err) => console.log("Error while setting the default account!"));


function start() {
	console.log(web3.eth.defaultAccount);
	// Contract address is taken by Truffle when migrations are executed and is used to 
	// identify a specific smart contract.
	var UnityContractAddress = "0x5c7eef2cbaaa5ba17d6b7f973e01ce6d46d2cf20";

	// Instantiate UnityContract.
	var UnityContract = new web3.eth.Contract(unity_abi.abi, UnityContractAddress);
	console.log(UnityContract.methods);
}
