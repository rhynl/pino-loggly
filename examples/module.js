const pino = require('pino');

const config = {
  token: '<token-goes-here>',
  tags: ['pino-loggly'],
  level: 'info',
  returnStream: true,
};

const pinoLoggly = require('../lib/pino-loggly')(config);

const logger = pino(pinoLoggly);

logger.warn('Hello World');
