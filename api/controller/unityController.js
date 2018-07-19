'use strict';

const logger = require('../../server/logger');
const Unity = require('../model/Unity');
const unityDAO = require('../dao/unityDAO');
const loggerDAO = require('../dao/loggerDAO');

const eventToPromise = require('event-to-promise');

async function handleAddEvent(error, event) {
    if (error) {
        logger.error("Error " + error);
        return;
    }
    unityDAO.getDatabase();
    // console.log("Event: " + event);
    logger.info(`Received the event: %j`, event);
    // console.log("Event:" + event);
    // let hash = await unityDAO.insertEvent(event);

    // logger.info("Val: " + y);
}

module.exports = {

    async subscribeToEvents() {
        logger.info("Subscribing to events.");
        // let UnityContract = unityDAO.getContractInfo();
        let LoggerContract = loggerDAO.getContractInfo();
        //
        // Subscribe to event Add.
        let x = LoggerContract.events.NewDeploy({fromBlock: 0}, (error, event) => handleAddEvent(error, event));
        x.on('error', (err) => console.error(err));
        // let emitter = web3.eth.subscribe("pendingTransactions", (error, result) => handleAddEvent(result));
        //
        // emitter.on('data', (data) => handleAddEvent(data));
        //
        // , {
        //         fromBlock: 0,
        //             address: web3.eth.defaultAccount
        //     }

        // let x = await eventToPromise(emitter, "data");
        // (log) => handleAddEvent(log));
    },

    getEvent(req, res) {
        logger.info(`Just received a get event request with id: ${req.params.eventId}.`);

        try {
            res.json(unityDAO.getEvent(req.params.eventId));
        } catch (error) {
            logger.error("" + error);
            res.status(500).send();
        }
    },

    setupDatabase() {
        // Should return a promise.
        return unityDAO.setupDatabase();
    }
    // // POST - /insert
    // // {}
    // // async insertUnity(req, res) {
    // //     // First we need to create a new unity by using the data stored in req.body.
    // //     logger.info("Just received an insert request.");
    // //     let newUnity = new Unity(req.body.landParcel, req.body.ownerAddress);
    // //
    // //     // Now I need to insert newUnity into the contract.
    // //     try {
    // //         let [insert, event] = await unityDAO.insertUnity(newUnity);
    // //         res.status(201).json(insert);
    // //     } catch (error) {
    // //         logger.error("" + error);
    // //         res.status(500).send();
    // //     }
    // // },
    //
    // async getList(req, res) {
    //     logger.info("Just received a getList request.");
    //     let address = req.body.address;
    //
    //     let result = null;
    //     try {
    //         result = await unityDAO.getList(address);
    //         res.json(result);
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // },
    //
    // getAddresses(req, res) {
    //     logger.info("Just received a getAddresses request.");
    //
    //     try {
    //         res.json(unityDAO.getAddresses());
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // },
    //
    // getAddress(req, res) {
    //     logger.info(`Just received a getAddress request with id: ${req.params.id}.`);
    //
    //     try {
    //         res.json(unityDAO.getAddress(req.params.id));
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // },
    //
    // async transfer(req, res) {
    //     logger.info('Just received a transfer request.');
    //
    //     let unity = new Unity(req.body.landParcel, req.body.ownerAddress);
    //
    //     try {
    //         res.json(await unityDAO.transfer(req.body.buyerAddress, unity));
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // },
    //
    // async getHistory(req, res) {
    //     logger.info(`Just received a getHistory request for landId: ${req.params.landId}`);
    //
    //     try {
    //         res.json(await unityDAO.getHistory(req.params.landId));
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // }
};