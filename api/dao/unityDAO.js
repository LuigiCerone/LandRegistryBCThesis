const web3 = require('../../server/web3');
const unity_abi = require('../../ethereum/build/contracts/Unity');
const logger = require('../../server/logger');
const database = require('./database');


var UnityContract = new web3.eth.Contract(unity_abi.abi);

// We need to set the contract's address and the default from (governament address i.e. first address).
UnityContract.options.address = Object.values(unity_abi.networks).pop().address;

// Setup ganache-cli addresses.
var addresses;
web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];
    addresses = accounts;
}).catch((err) => logger.error(err));

let db = null;

module.exports = {
    insertEvent(event) {
        if (db != null) {
            // Insert in the db transactionHash, returnValues.sender.
            let toInsert = {
                transactionHash: event.transactionHash,
                contractAddress: event.returnValues.contractAddress,
                land: {
                    district: event.returnValues._district,
                    document: event.returnValues._document,
                    landParcel: event.returnValues._landParcel,
                    subaltern: event.returnValues._subaltern,
                    ownerAddress: event.returnValues._ownerAddress,
                }
            };

            let id = toInsert.land.landParcel;
            toInsert.land.subaltern !== "" ? id += toInsert.land.subaltern : id += "";
            logger.info("ID is: " + id);
            return db.put({_id: id, contract: toInsert});
        }
    },

    getEvent(id) {
        logger.info(db.get(id));
        return db.get(id);
    },

    getEvents() {
        return db.query((doc) => doc._id != null);
        // return db.iterator({limit: 2}).collect();
    },

    getDatabase() {
        if (db == null) {
            db = database.getDatabase();
        }
        return db;
    },

    setupDatabase() {
        return database.setupDatabase();
        // // Deve tornare una promise.
    },

    getAddresses() {
        return addresses;
    }
    ,

    getAddress(n) {
        if (n === undefined) throw "Param is undefined.";
        if (n >= addresses.length || n < 0) throw "Invalid param number.";
        return addresses[n];
    }
    ,

    getContractInfo() {
        return UnityContract;
    }
    ,

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
    }
    ,

    async getList(address) {
        let n = await
            UnityContract.methods.getNoOfLands(address).call();
        let promises = [];
        for (let i = 0; i < n; i++) {
            promises.push(UnityContract.methods.getLand(address, i).call());
        }
        return Promise.all(promises);
    }
    ,

    getHistory(landId) {
        return UnityContract.methods.getHistoryForLand(landId).call();
    }
    ,

    transfer(buyerAddress, unity) {
        return UnityContract.methods.transferLand(buyerAddress, unity._landParcel).send({
            from: unity._ownerAddress,
            gas: 300000
        });
    }
};