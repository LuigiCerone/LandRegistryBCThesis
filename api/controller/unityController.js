'use strict';

const logger = require('../../server/logger');
const Unity = require('../model/Unity');
const unityDAO = require('../dao/unityDAO');

module.exports = {

    // POST - /insert
    // {}
    async insertUnity(req, res) {
        // First we need to create a new unity by using the data stored in req.body.
        logger.info("Just received an insert request");
        let newUnity = new Unity(req.body.landParcel, req.body.ownerAddress);

        // Now I need to insert newUnity into the contract.
        try {
            var [insert, event] = await unityDAO.insertUnity(newUnity);
        } catch (error) {
            logger.error("" + error);
        }
        res.status(201).json(insert);
    },

    async getList(req, res) {
        let result = null;
        try {
            result = await unityDAO.getList();
        } catch (error) {
            logger.error("" + error);
        }
        res.json(result);
    }
};