'use strict';

const logger = require('../../server/logger');
const Unity = require('../model/Unity');
const unityDAO = require('../dao/unityDAO');

module.exports = {

    // POST - /insert
    // {}
    async insertUnity(req, res) {
        // First we need to create a new unity by using the data stored in req.body.
        logger.info("Just received an insert request.");
        let newUnity = new Unity(req.body.landParcel, req.body.ownerAddress);

        // Now I need to insert newUnity into the contract.
        try {
            let [insert, event] = await unityDAO.insertUnity(newUnity);
            res.status(201).json(insert);
        } catch (error) {
            logger.error("" + error);
            res.status(500).send();
        }
    },

    async getList(req, res) {
        logger.info("Just received a getList request.");
        let address = req.body.address;

        let result = null;
        try {
            result = await unityDAO.getList(address);
            res.json(result);
        } catch (error) {
            logger.error("" + error);
            res.status(500).send();
        }
    },

    getAddresses(req, res) {
        logger.info("Just received a getAddresses request.");

        try {
            res.json(unityDAO.getAddresses());
        } catch (error) {
            logger.error("" + error);
            res.status(500).send();
        }
    },

    getAddress(req, res) {
        logger.info(`Just received a getAddress request with id: ${req.params.id}.`);

        try {
            res.json(unityDAO.getAddress(req.params.id));
        } catch (error) {
            logger.error("" + error);
            res.status(500).send();
        }
    },

    async transfer(req, res) {
        logger.info('Just received a transfer request.');

        let unity = new Unity(req.body.landParcel, req.body.ownerAddress);

        try {
            res.json(await unityDAO.transfer(req.body.buyerAddress, unity));
        } catch (error) {
            logger.error("" + error);
            res.status(500).send();
        }
    },

    async getHistory(req, res) {
        logger.info(`Just received a getHistory request for landId: ${req.params.landId}`);

        try {
            res.json(await unityDAO.getHistory(req.params.landId));
        } catch (error) {
            logger.error("" + error);
            res.status(500).send();
        }
    }
};