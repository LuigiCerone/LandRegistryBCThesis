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
        logger.info(addresses[1]);

        return UnityContract.methods.addLand(newUnity._landParcel).send({from: addresses[1], gas: 300000});
        // .then((res) => logger.info("Result: %j", res)).catch((err) => logger.error("Error" + err));

        // UnityContract.events.Add({fromBlock: 0, toBlock: 'latest'}, function (error, event) {
        // }).on('data', function (event) {
        //     logger.info("Event: %j", event);
        // }).on('error', (err) => logger.error(err));
    },

    initContract() {

    },

    getList() {
        return UnityContract.methods.getNoOfLands(addresses[1]).call();
    }

};