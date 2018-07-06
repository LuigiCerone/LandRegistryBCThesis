'use strict';

const logger = require('../../server/logger');
const Unity = require('../model/Unity');

module.exports = {
    insertUnity(req, res) {
        // First we need to create a new unity by using the data stored in req.body.
        logger.info("Just received this values: " + req.body.test);
        res.status(201).send();
    }
};