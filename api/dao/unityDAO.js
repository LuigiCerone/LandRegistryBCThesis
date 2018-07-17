const web3 = require('../../server/web3');
const unity_abi = require('../../ethereum/build/contracts/Unity');
const logger = require('../../server/logger');

let db = null;

// let db;
// const orbitDB = require('./database').then(() => x
//     )
// ;
// console.log(orbitDB);
//
// const orbitDB = require('./database').then((database) => {
//     debugger;
//     database.docstore('dbTest')
//         .then(instance => db = instance)
// })
//     .catch(err => logger.error(err));


var UnityContract = new web3.eth.Contract(unity_abi.abi);

// We need to set the contract's address and the default from (governament address i.e. first address).
UnityContract.options.address = Object.values(unity_abi.networks).pop().address;

// Setup ganache-cli addresses.
var addresses;
web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];
    addresses = accounts;
}).catch((err) => logger.error(err));

module.exports = {
    insertEvent(event) {
        if (db != null)
            return db.put({_id: 1, event: event});
    },

    getEvent(id) {
        return db.get(id);
    },

    getDatabase() {
        return db;
    },

    async setupDatabase() {
        try {
            db = await require('./database').getDatabase();
            debugger;
        } catch (error) {
            logger.error("" + error);
        }
    },

    getAddresses() {
        return addresses;
    },

    getAddress(n) {
        if (n === undefined) throw "Param is undefined.";
        if (n >= addresses.length || n < 0) throw "Invalid param number.";
        return addresses[n];
    },

    getContractInfo() {
        return UnityContract;
    },

    insertUnity(newUnity) {
        // logger.info(addresses[2]);

        let addPromise = UnityContract.methods.addLand(newUnity._landParcel, newUnity._ownerAddress).send({
            from: web3.eth.defaultAccount,
            gas: 300000
        });
        // .then((res) => logger.info("Result: %j", res)).catch((err) => logger.error("Error" + err));

        // let emitter =
        // return Promise.all([addPromise, eventToPromise(emitter, 'data')]);
        // .on('data', function (event) {
        // logger.info("Event: %j", event);
        // }).on('error', (err) => logger.error(err));
    },

    async getList(address) {
        let n = await UnityContract.methods.getNoOfLands(address).call();
        let promises = [];
        for (let i = 0; i < n; i++) {
            promises.push(UnityContract.methods.getLand(address, i).call());
        }
        return Promise.all(promises);
    },

    getHistory(landId) {
        return UnityContract.methods.getHistoryForLand(landId).call();
    },

    transfer(buyerAddress, unity) {
        return UnityContract.methods.transferLand(buyerAddress, unity._landParcel).send({
            from: unity._ownerAddress,
            gas: 300000
        });
    }
};