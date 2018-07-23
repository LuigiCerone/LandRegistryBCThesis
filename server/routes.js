const express = require('express');
// Add controller import here;
const unityController = require('../api/controller/unityController');

const router = express.Router();

// Map each endpoint to router method.
router.get('/event/:eventId', unityController.getEvent);
router.get('/events', unityController.getEvents);
router.get('/getHistory', unityController.getHistoryByLandId);
router.get('/getLandsForAddress', unityController.getLandsForAddress);
router.get('/getLandById', unityController.getLandById);

module.exports = router;
