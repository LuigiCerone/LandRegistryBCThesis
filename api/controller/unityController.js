'use strict';

const logger = require('../../server/logger');
const Unity = require('../model/Unity');

module.exports = {

    // POST - /insert
    // {}
    insertUnity(req, res) {
        // First we need to create a new unity by using the data stored in req.body.
        logger.info("Just received an insert request");
        let newUnity = new Unity(req.body.landParcel, req.body.ownerAddress);

        // Now I need to insert newUnity into the contract.

        res.status(201).send();
    }
};