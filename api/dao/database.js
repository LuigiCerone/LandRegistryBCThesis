const IpfsApi = require('ipfs-api');
const OrbitDB = require('orbit-db');
const logger = require('../../server/logger');


// Create IPFS instance.
const ipfs = IpfsApi('localhost', '5001');

let db = null;

module.exports = {
    async setupDatabase() {
        // Deve tornare una promise.
        try {
            const orbitdb = new OrbitDB(ipfs);
            db = await orbitdb.docstore('land_registry');
        }
        catch (error) {
            logger.error("" + error);
        }
    },
    getDatabase() {
        return db;
    }
};