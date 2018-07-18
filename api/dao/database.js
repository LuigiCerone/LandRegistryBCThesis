const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const eventToPromise = require('event-to-promise');
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

let db = null;


module.exports = {
    async setupDatabase() {
        // Deve tornare una promise.
        try {
            await eventToPromise(ipfs, 'ready');
            const orbitdb = new OrbitDB(ipfs);
            db = await orbitdb.docstore('test');
        }
        catch (error) {
            logger.error("" + error);
        }
    },
    getDatabase() {
        return db;
    }
};


// getDatabase: async function () {
//     await eventToPromise(ipfs, 'ready');
//
//     // let orbitdb = new OrbitDB(ipfs);
//     // let db = await orbitdb.docstore('/orbitdb/QmekaumXKQFtYXuUadzKHA9PQ1WagNjajdYUcisXniVdhs/test');
//     // await db.load();
//     // logger.info("here here");
//
//     const orbitdb = new OrbitDB(ipfs);
//     const db = await orbitdb.keyvalue('first-db');
//     return await db.put('name', 'hello');
// }


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