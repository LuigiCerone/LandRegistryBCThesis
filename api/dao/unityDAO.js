const web3 = require('../../server/web3');
const unity_abi = require('../../ethereum/build/contracts/Unity');
const logger = require('../../server/logger');


var UnityContract = new web3.eth.Contract(unity_abi.abi);

// We need to set the contract's address.
UnityContract.options.address = Object.values(unity_abi.networks).pop().address;
// console.log(UnityContract);
// var contractInstance = UnityContract.deploy({
//     data: unity_abi.bytecode,
//     arguments: [0, (web3.utils.asciiToHex('324'))]
// });
var addresses;
web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];
    addresses = accounts;
}).catch((err) => logger.error(err));

module.exports = {
    getContractInfo() {
        return UnityContract;
    },

    insertUnity(newUnity) {
        logger.info(newUnity._landParcel);
        UnityContract.methods.addLand(newUnity._landParcel).call()
            .then(console.log);
    },

    initContract() {

    },

    getList() {
        UnityContract.methods.getNoOfLands.call(addresses[0])
            .then(console.log);
    }

};