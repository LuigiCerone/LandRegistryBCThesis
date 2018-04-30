import web3 from './web3';
import $ from 'jquery';

// web3.eth.getAccounts().then(console.log);
import unity_abi from 'CompiledContracts/Unity.json';

// Setup of defaultAccount.
web3.eth.getAccounts().then((accounts) => {
	web3.eth.defaultAccount = accounts[0];
	start();
}).catch((err) => console.log("Error while setting the default"));


function start() {
	console.log(web3.eth.defaultAccount);
	// Contract address is taken by Truffle when migrations are executed and is used to 
	// identify a specific smart contract.
	var UnityContractAddress = "0x5ae3a4b2a7627ac18ee3a4a2b88621889cb1eadd";

	// Instantiate UnityContract.
	var UnityContract = new web3.eth.Contract(unity_abi.abi, UnityContractAddress);
	// console.log(UnityContract.methods);

	console.log(UnityContract.methods);

	UnityContract.methods.getOwner().call().then(console.log);
	UnityContract.methods.getId().call().then(console.log);

	$('#add').on('click', function () {
		let price = $('#price').val();
		let id = web3.utils.asciiToHex($('#id').val());

		console.log(price, id);
		UnityContract.methods.setUnity(price, id).send({
			'from': web3.eth.defaultAccount
		}).on('receipt', console.log);
	});
}


// UnityContract.deploy({
// 		data: unity_abi.bytecode,
// 		arguments: [price, id]
// 	}).send({
// 		from: web3.eth.defaultAccount,
// 		gas: 1500000,
// 		gasPrice: '30000000000000'
// 	})
// 	.then(function (newContractInstance) {
// 		console.log(newContractInstance.options.address) // instance with the new contract address
// 	});
