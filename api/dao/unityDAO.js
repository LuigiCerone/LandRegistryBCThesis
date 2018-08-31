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
    insertNewDeployEvent(event) {
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
                    history: [
                        {
                            owner: event.returnValues._ownerAddress,
                            timestamp: new Date().getTime()
                        }
                    ]
                }
            };

            let id = toInsert.land.landParcel;
            toInsert.land.subaltern !== "" ? id += toInsert.land.subaltern : id += "";
            logger.info("ID is: " + id);
            return db.put({_id: id, contract: toInsert});
        }
    },

    insertTransferEvent(event) {
        if (db != null) {

            // Get already inserted element.
            let id = event.returnValues._landParcel + event.returnValues._subaltern;
            // logger.info(id);
            let storedContract = db.get(id)[0];

            if (storedContract != null) {
                logger.info(storedContract);
                // Add new history entry.
                storedContract.contract.land.history.push({
                    owner: event.returnValues._landBuyer,
                    timestamp: new Date().getTime()
                });

                storedContract.contract.land.ownerAddress = event.returnValues._landBuyer;

                // Update in DB.
                db.put({_id: id, contract: storedContract.contract});

            } else {
                logger.info(`Cannot find the contract with id: ${id}.`);
            }
        }
    },

    getEvent(id) {
        return db.get(id);
    },

    getEvents() {
        return db.query((doc) => doc._id != null);
    },

    getDatabase() {
        if (db == null) {
            db = database.getDatabase();
        }
        return db;
    },

    setupDatabase() {
        return database.setupDatabase();
        // Deve tornare una promise.
    },

    getHistoryByLandId(id) {
        try {
            if (db == null) {
                this.getDatabase();
            }
            let result = db.query((doc) => doc._id === id);
            if (result.length !== 0)
                return result[0].contract.land.history;
            else return null;
        } catch (error) {
            logger.error("" + error);
        }
    },


    getLandById(id) {
        if (db == null) {
            this.getDatabase();
        }
        return db.query((doc) => doc._id === id);
    },

    getLandsForAddress(searchAddress) {
        if (db == null) {
            this.getDatabase();
        }
        return db.query((doc) => doc.contract.land.ownerAddress === searchAddress).map((item) => item.contract.land);
    },

    getContractInfo() {
        return UnityContract;
    },

    async getList(address) {
        let n = await
            UnityContract.methods.getNoOfLands(address).call();
        let promises = [];
        for (let i = 0; i < n; i++) {
            promises.push(UnityContract.methods.getLand(address, i).call());
        }
        return Promise.all(promises);
    }
};