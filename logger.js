'use strict';

const winston = require('winston');

const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    )
});

module.exports = {
    log(message, optionalParams) {
        logger.log({
            level: 'info',
            message: message + " " + optionalParams ? optionalParams : ''
        });
    },

    error(message, optionalParams) {
        logger.log({
            level: 'error',
            message: message + " " + optionalParams ? optionalParams : ''
        });
    },

    warn(message, optionalParams) {
        logger.log({
            level: 'warn',
            message: message + " " + optionalParams ? optionalParams : ''
        });
    },

    debug(message, optionalParams) {
        logger.log({
            level: 'debug',
            message: message + " " + optionalParams ? optionalParams : ''
        });
    },

    http(message, optionalParams) {
        logger.log({
            level: 'http',
            message: message + " " + optionalParams ? optionalParams : ''
        });
    },

    verbose(message, optionalParams) {
        logger.log({
            level: 'verbose',
            message: message + " " + optionalParams ? optionalParams : ''
        });
    },

    silly(message, optionalParams) {
        logger.log({
            level: 'silly',
            message: message + " " + optionalParams ? optionalParams : ''
        });
    },

    levels: {
        error: 'error', //0,
        warn: 'warn', //1,
        info: 'info', //2,
        http: 'http', //3,
        verbose: 'verbose', //4,
        debug: 'debug', //5,
        silly: 'silly' //6
    }
}