const express = require('express');
// Add controller import here;
const unityController = require('../api/controller/unityController');

const router = express.Router();

// Map each endpoint to router method.
// router.post('/add', controller.method);
router.post('/insert', unityController.insertUnity);

module.exports = router;
