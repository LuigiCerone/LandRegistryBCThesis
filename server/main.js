'use strict';
const express = require('express');
const logger = require('./logger');

const app = express();
const PORT = 3000;


module.exports = {
    start({
              env = process.env.NODE_ENV || 'development'
          }) {
        //Serve static assets (js, css, ...)
        app.use(express.static('app'));

        //Serve contract artifact files (ex: ToDo.json)
        // app.use(express.static('build/contracts'));

        //Serve index.html
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/app/index.html');
        });

        //If anything else is requested that's an error
        app.get('*', (req, res) => {
            res.status(404);
            res.send('Oops... this URL does not exist');
        });


        //Start the server
        app.listen(PORT, () => {
            logger.info(`Ethereum app running on port ${PORT}...`);
        });
    }
};
