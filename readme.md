# pino-loggly [![Build Status](https://travis-ci.com/rhynl/pino-loggly.svg?branch=master)](https://travis-ci.com/rhynl/pino-loggly)

> send pino logs to loggly

## Install

```sh
$ npm install pino-loggly
```

## Usage

Send pino logs to loggly

```sh
node my-app.js | pino-loggly [options]
```

```js
const pinoLoggly = require('pino-loggly')({
  token: 'token-goes-here',
  tags: ['tag1', 'tag2'],
  json: false,
});

const logger = pino(pinoLoggly);

logger.error('Hello World');
```

## Options

```sh
Usage
    $ pino-loggly

  Options
    -h, --help                      output usage information
    -V, --version                   output the version number
    --token                         Loggly token
    --tags                          list of tags [Default: []]
    --json                          data is json type [Default: false]
```

## License

MIT © [Rhaynel Parra Aguiar](https://rhynl.io)
