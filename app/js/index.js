import web3 from './web3';
import $ from 'jquery';

// web3.eth.getAccounts().then(console.log);
import unity_abi from 'CompiledContracts/Unity.json';
// Setup of defaultAccount.

web3.eth.getAccounts().then((accounts) => {
	console.log("qui");
	web3.eth.defaultAccount = accounts[0];
	console.log(accounts);
}, function (error) {
	console.log(error)
});
console.log("qua");

// function start() {
// 	console.log(web3.eth.defaultAccount);
// 	// Contract address is taken by Truffle when migrations are executed and is used to 
// 	// identify a specific smart contract.
// 	// var UnityContractAddress = "0x888af8dd6a24cc46b1ae83872d0b4037a7cbb7e2";

// 	// Instantiate UnityContract.
// 	var UnityContract = new web3.eth.Contract(unity_abi.abi);
// 	var contractInstance;
// 	console.log(UnityContract);

// 	// UnityContract.methods.getOwner().call().then(console.log).catch(console.log);
// 	// UnityContract.methods.getId().call().then((id) => $('#id').val(web3.utils.hexToString(id)));

// 	if (contractInstance != null)
// 		contractInstance.methods.getId().call().then((id) => $('#id').val(web3.utils.hexToString(id)))
// 		.catch((err) => console.log(err));


// 	$('#add').on('click', function () {
// 		let price = $('#price').val();
// 		let id = web3.utils.asciiToHex($('#id').val());

// 		// UnityContract.methods.setUnity(price, id).send({
// 		// 	'from': web3.eth.defaultAccount
// 		// }).on('receipt', console.log);

// 		// UnityContract.methods.constructor(price, id).send({
// 		// 	'from': web3.eth.defaultAccount
// 		// }).on('receipt', console.log);

// 		contractInstance = UnityContract.deploy({
// 			data: unity_abi.bytecode,
// 			arguments: [price, id]
// 		}).send({
// 			from: web3.eth.defaultAccount,
// 			gas: 1500000,
// 			gasPrice: '30000000000000'
// 		}).then((instance) => {
// 			contractInstance = instance;
// 			console.log(contractInstance);
// 			//Call a method
// 			contractInstance.methods.getId().call().then((id) => $('#id').val(web3.utils.hexToString(id)));
// 		});
// 	});
// }


// // UnityContract.deploy({
// // 		data: unity_abi.bytecode,
// // 		arguments: [price, id]
// // 	}).send({
// // 		from: web3.eth.defaultAccount,
// // 		gas: 1500000,
// // 		gasPrice: '30000000000000'
// // 	})
// // 	.then(function (newContractInstance) {
// // 		console.log(newContractInstance.options.address) // instance with the new contract address
// // 	});
