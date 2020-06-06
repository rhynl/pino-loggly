const logger = require('pino')();

setInterval(() => {
  logger.info('Everythig is ok!');
}, 2000);

setInterval(() => {
  logger.warn('This is a warning!');
}, 3500);

setInterval(() => {
  logger.error({ mesagge: 'This is an error!', code: 400 });
}, 5000);



// Run from bash node ./examples/cli.js | ./dist/cli.js --token <token-goes-here> --tag example
