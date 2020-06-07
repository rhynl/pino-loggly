const pino = require("pino");
const { } = require("../dist/lib/pino-loggly");

const config = {
  token: "<put-token-here>",
  tags: ["module", "pino-loggly"],
  level: "debug",
  returnStream: true,
};

const loggly = new PinoLoggly(config);

const logger = pino(loggly.init());

setInterval(() => {
  logger.info("Hello World from pino-loggly");
}, 2000);
