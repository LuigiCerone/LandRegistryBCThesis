import web3 from './web3';

// web3.eth.getAccounts().then(console.log);
import unity_abi from  'CompiledContracts/Unity.json'; 
// Contract address is taken by Truffle when migrations are executed and is used to 
// identify a specific smart contract.
var UnityContractAddress = "0x5c7eef2cbaaa5ba17d6b7f973e01ce6d46d2cf20";
var UnityContract = new web3.eth.Contract(unity_abi.abi, UnityContractAddress);