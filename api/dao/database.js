const IpfsApi = require('ipfs-api');
const OrbitDB = require('orbit-db');
const eventToPromise = require('event-to-promise');
const logger = require('../../server/logger');


// Create IPFS instance.
const ipfs = IpfsApi('localhost', '5001');

let db = null;


module.exports = {
    async setupDatabase() {
        // Deve tornare una promise.
        try {
            // await eventToPromise(ipfs, 'ready');
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