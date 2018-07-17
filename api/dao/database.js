const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const logger = require('../../server/logger');


// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples even if not specfied so.
const ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true
    },
};

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions);

let orbitDB = null;
ipfs.start()
    .then(() => {// Create a database
        orbitDB = new OrbitDB(ipfs);
    })
    .catch(e => logger.error(e));


module.exports = {
    getDatabase() {
        return orbitDB.docstore('dbTest');
    }
};