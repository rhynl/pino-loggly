#!/usr/bin/env node
import meow from "meow";
import { PinoLoggly, SeverityLevel } from "./lib/pino-loggly";

const cli = meow(`
Usage
  $ pino-loggly [options]

Options
  --token         Loggly token [Required]
  --tag           tag to add to the tag list
  --returnStream  send to stdout and/or stderr [Default: false]
  --logLevel      log level [Default: info | possible values: trace, debug, info, warn, error, fatal]

Example
  $ pino-loggly --token 2c52ac24-2c52ac24-2c52ac24-2c52ac24 --tag pino-loggly --tag cli-msg --json
`, {
  flags: {
    token: {
      type: "string",
      isRequired: (flags) => {
        if (flags.tag || flags.json || flags.returnStream) {
          return true;
        }

        return false;
      },
    },
    returnStream: {
      type: "boolean",
    },
    tag: {
      type: "string",
      isMultiple: true,
      alias: "t",
    },
    logLevel: {
      type: "string",
    },
  },
  booleanDefault: undefined,
});

if (Object.keys(cli.flags).length === 0) {
  cli.showHelp();
  process.exit(0);
}

const { tag, token, logLevel, returnStream } = cli.flags;

const loggly = new PinoLoggly({
  token,
  tags: tag as unknown as string[],
  level: logLevel as SeverityLevel,
  returnStream,
});

loggly.init();
