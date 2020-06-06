# pino-loggly [![Build Status](https://travis-ci.com/rhynl/pino-loggly.svg?branch=master)](https://travis-ci.com/rhynl/pino-loggly)

> send pino logs to loggly

## Install

```sh
npm install pino-loggly
```

## Usage

Send pino logs to loggly

```sh
node my-app.js | pino-loggly [options]
```

```ts
import PinoLoggly from "pino-loggly";

const loggly = new PinoLoggly({
  token: 'token-goes-here',
  tags: ['tag1', 'tag2'],
  json: false,
  returnStream: true,
});

const logger = pino(loggly.init());

logger.error('Hello World');
```

## Options

```sh
Usage
  $ pino-loggly [options]

Options
  --token         Loggly token [Required]
  --tag           list of tags [Default: ""]
  --json          data is json type
  --returnStream  send to stdout and/or stderr
  --logLevel      log level [Default: info]

Example
  $ pino-loggly --token 2c52ac24-2c52ac24-2c52ac24-2c52ac24 --tag pino-loggly --tag cli-msg --json false
```

## License

MIT © [Rhaynel Parra Aguiar](https://rhynl.io)
