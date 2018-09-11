'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const unityController = require('../api/controller/unityController');


const logger = require('./logger');
const routes = require('./routes');

const app = express();


module.exports = {
    async start({
                    env = process.env.NODE_ENV || 'development'
                }) {
        logger.info(`Running mode ${env}`);

        // Setup database.
        await unityController.setupDatabase();

        //Serve static assets (js, css, ...)
        app.use(express.static('app/dist'));

        // Setup body parser.
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        // Set application port.
        app.set('port', process.env.PORT || 3000);

        // Set routes.
        app.use('/rest/v1/', routes);

        // Setup logger for express HTTP requests.
        app.use(morgan('dev'));

        // Subscribe to event.
        unityController.subscribeToEvents();

        //If anything else is requested that's an error
        app.get('*', (req, res) => {
            logger.error("404 - Not found: " + req);
            res.status(404);
            res.send('Oops... this URL does not exist');
        });

        //Start the server
        app.listen(app.get('port'), () => {
            logger.info(`Ethereum app running on port ${app.get('port')}...`);
        });
    }
};
