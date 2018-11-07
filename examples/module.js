const pino = require('pino');
const pinoLoggly = require('../lib')({
  token: 'token-goes-here',
  tags: ['pino-loggly'],
  json: false,
});

const logger = pino(pinoLoggly);

logger.error('Hello World');
