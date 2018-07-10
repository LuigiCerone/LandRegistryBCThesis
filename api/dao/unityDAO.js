const web3 = require('../../server/web3');
const unity_abi = require('../../ethereum/build/contracts/Unity');
const logger = require('../../server/logger');
const eventToPromise = require('event-to-promise');


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
        logger.info(addresses[2]);

        let addPromise = UnityContract.methods.addLand(newUnity._landParcel).send({
            gas: 300000
        });
        // .then((res) => logger.info("Result: %j", res)).catch((err) => logger.error("Error" + err));

        let emitter = UnityContract.events.Add({fromBlock: 0, toBlock: 'latest'});
        return Promise.all([addPromise, eventToPromise(emitter, 'data')]);
        // .on('data', function (event) {
        // logger.info("Event: %j", event);
        // }).on('error', (err) => logger.error(err));
    },

    initContract() {

    },

    async getList() {
        let n = await UnityContract.methods.getNoOfLands(addresses[1]).call();
        let promises = [];
        for (let i = 0; i < n; i++) {
            promises.push(UnityContract.methods.getLand(addresses[1], i).call());
        }
        return Promise.all(promises);
    }
};