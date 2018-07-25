import UnityAbi from "BuildContracts/Unity";
import LoggerAbi from "BuildContracts/Logger";

let loggerContractAddress = Object.values(LoggerAbi.networks).pop().address;
let UnityContract = new web3.eth.Contract(UnityAbi.abi);
let UnityContractByteCode = UnityAbi.bytecode;


module.exports = {loggerContractAddress, UnityContract, UnityContractByteCode};
