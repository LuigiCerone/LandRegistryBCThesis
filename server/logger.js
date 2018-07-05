const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            colorize: true,
            level: 'verbose',
            timestamp: true
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        }),
    ]
});
module.exports = logger;