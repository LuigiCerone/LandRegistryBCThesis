const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const logger = require('../../server/logger');
const eventToPromise = require('event-to-promise');


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

module.exports = {
    getDatabase: async function () {
        await eventToPromise(ipfs, 'ready');

        let orbitdb = new OrbitDB(ipfs);
        let db = await orbitdb.docstore('/orbitdb/QmekaumXKQFtYXuUadzKHA9PQ1WagNjajdYUcisXniVdhs/test');
        await db.load();
        logger.info("here here");
    }
};

// let orbitdb, db;
// let promise =
// .
// then(() =>)
//     .then(() =>)
//     .then(() =>)
//     .catch((err) => logger.error("" + err));

// var db = new Promise.all(ipfs.on('ready', async () => {
//     const ;
//
//     // Create / Open a database
//     const db = await orbitdb.docstore('dbTest');
//     await db.load()
//
// });


// module.exports = promise;