'use strict';

const logger = require('../../server/logger');
const unityDAO = require('../dao/unityDAO');
const loggerDAO = require('../dao/loggerDAO');


async function handleNewDeployEvent(error, event) {
    if (error) {
        logger.error("Error " + error);
        return;
    }
    unityDAO.getDatabase();

    logger.info(`Received the event: %j`, event);
    // console.log("Event:" + event);
    let hash = await unityDAO.insertNewDeployEvent(event);

    // logger.info("Val: " + y);
}

async function handleTransferEvent(error, event) {
    if (error) {
        logger.error("Error " + error);
        return;
    }
    unityDAO.getDatabase();

    logger.info(`Received the event: %j`, event);
    // console.log("Event:" + event);
    let hash = await unityDAO.insertTransferEvent(event);

    // logger.info("Val: " + y);
}

module.exports = {

    async subscribeToEvents() {
        logger.info("Subscribing to events.");
        // let UnityContract = unityDAO.getContractInfo();
        let LoggerContract = loggerDAO.getContractInfo();
        // Subscribe to event NewDeploy.
        let newDeployEmitter = LoggerContract.events.NewDeploy({fromBlock: 0}, (error, event) => handleNewDeployEvent(error, event));
        newDeployEmitter.on('error', (err) => logger.error(err));

        // Subscribe to event Transfer.
        let transferEmitter = LoggerContract.events.Transfer({fromBlock: 0}, (error, event) => handleTransferEvent(error, event));
        transferEmitter.on('error', (err) => logger.error(err));
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

    getEvents(req, res) {
        logger.info(`Just received a get events request.`);

        try {
            res.json(unityDAO.getEvents());
        } catch (error) {
            logger.error("" + error);
            res.status(500).send();
        }
    },

    setupDatabase() {
        // Should return a promise.
        return unityDAO.setupDatabase();
    },

    getHistoryByLandId(req, res) {
        logger.info(`Just received a get history request with id: ${req.query.id}`);

        res.json(unityDAO.getHistoryByLandId(req.query.id));
    },

    getLandById(req, res) {
        logger.info(`Just received a get land by id request with id: ${req.query.id}`);

        res.json(unityDAO.getLandById(req.query.id));
    },


    getLandsForAddress(req, res) {
        logger.info(`Just received a get lands by address request with address: ${req.query.addr}`);

        res.json(unityDAO.getLandsForAddress(req.query.addr));
    }
};