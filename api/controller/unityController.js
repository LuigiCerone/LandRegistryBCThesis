'use strict';

const logger = require('../../server/logger');
const unityDAO = require('../dao/unityDAO');
const loggerDAO = require('../dao/loggerDAO');
const multihash = require('../../server/multihash');
const web3 = require('../../server/web3');
const unity_abi = require('../../ethereum/build/contracts/Unity');

let db = unityDAO.getDatabase();

async function handleNewDeployEvent(error, event) {
  if (error) {
    logger.error('Error ' + error);
    return;
  }
  if (db == null) db = unityDAO.getDatabase();

  logger.info(`Received the event: %j`, event);
  // console.log("Event:" + event);
  let hash = await unityDAO.insertNewDeployEvent(event);
  logger.info('hash: ' + hash);

  let ipfs = multihash.getBytes32FromMultiash(hash);
  console.log(ipfs);
  let result = await unityDAO.insertIFPSHash(ipfs,
      event.returnValues.contractAddress);
  logger.info(result);
}

async function handleTransferEvent(error, event) {
  if (error) {
    logger.error('Error ' + error);
    return;
  }
  if (db == null) db = unityDAO.getDatabase();

  logger.info(`Received the event: %j`, event);
  let hash = await unityDAO.insertTransferEvent(event);

  logger.info('hash: ' + hash);
}

module.exports = {

  async subscribeToEvents() {
    logger.info('Subscribing to events.');
    // let UnityContract = unityDAO.getContractInfo();
    let LoggerContract = loggerDAO.getContractInfo();
    // Subscribe to event NewDeploy.
    let newDeployEmitter = LoggerContract.events.NewDeploy(
        {fromBlock: 'latest'},
        (error, event) => handleNewDeployEvent(error, event));
    newDeployEmitter.on('error', (err) => logger.error(err));

    // Subscribe to event Transfer.
    let transferEmitter = LoggerContract.events.Transfer({fromBlock: 'latest'},
        (error, event) => handleTransferEvent(error, event));
    transferEmitter.on('error', (err) => logger.error(err));
  },

  getEvent(req, res) {
    logger.info(
        `Just received a get event request with id: ${req.params.eventId}.`);

    try {
      res.json(unityDAO.getEvent(req.params.eventId));
    } catch (error) {
      logger.error('' + error);
      res.status(500).send();
    }
  },

  getEvents(req, res) {
    logger.info(`Just received a get events request.`);

    try {
      res.json(unityDAO.getEvents());
    } catch (error) {
      logger.error('' + error);
      res.status(500).send();
    }
  },

  setupDatabase() {
    // Should return a promise.
    return unityDAO.setupDatabase();
  },

  getHistoryByLandId(req, res) {
    logger.info(`Just received a get history request with id: ${req.query.id}`);
    unityDAO.getHistoryByLandId(req.query.id).then((result) => {
      if (result && result.length !== 0) {
        res.json(result);
      } else {
        res.status(404).send('Not found');
      }
    }).catch((err) => {
      logger.error('' + err);
      res.status(500).send();
    });
  },

  getLandById(req, res) {
    logger.info(
        `Just received a get land by id request with id: ${req.query.id}`);
    let result = unityDAO.getLandById(req.query.id);

    if (result && result.length !== 0) {
      res.json(result);
    } else {
      res.status(404).send('Not found');
    }
  },

  getLandsForAddress(req, res) {
    logger.info(
        `Just received a get lands by address request with address: ${req.query.addr}`);

    unityDAO.getLandsForAddress(req.query.addr).then((result) => {
      if (result && result.length !== 0) {
        res.json(result);
      } else {
        res.status(404).send('Not found');
      }
    }).catch((err) => {
      logger.error('' + err);
      res.status(500).send();
    });

  },
};