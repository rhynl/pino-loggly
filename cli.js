#!/usr/bin/env node
const meow = require('meow');
const pinoLoggly = require('.');

const cli = meow(`
	Usage
	  $ pino-loggly

	Options
    --token  Loggly token
    --tags  list of tags [Default: []]
    --json  data is json type [Default: false]
    --returnStream send to stdout and/or stderr

	Example
	  $ pino-loggly --token 2c52ac24-2c52ac24-2c52ac24-2c52ac24 --tags pino-loggly,cli-msg --json false
`);

const {
  token,
  tags,
  json,
} = cli.flags;

pinoLoggly({
  token,
  tags: tags.split(','),
  json,
});
