const express = require('express');
// Add controller import here;
const unityController = require('../api/controller/unityController');

const router = express.Router();

// Map each endpoint to router method.
// router.post('/add', controller.method);
// router.post('/insert', unityController.insertUnity);
// router.post('/list', unityController.getList);
// router.get('/addresses', unityController.getAddresses);
// router.get('/address/:id', unityController.getAddress);
// router.post('/transfer', unityController.transfer);
// router.get('/history/:landId', unityController.getHistory);
router.get('/event/:eventId', unityController.getEvent);
router.get('/events', unityController.getEvents);

module.exports = router;
