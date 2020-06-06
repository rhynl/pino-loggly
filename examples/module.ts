import pino from "pino";
import { PinoLoggly } from "../lib/loggly";

const config = {
  token: "<PUT-TOKEN-HERE>",
  tags: ["final-test", "2020"],
  level: "debug",
  returnStream: true,
};

const loggly = new PinoLoggly(config);

const logger = pino(loggly.init());

setInterval(() => {
  logger.info("Hello World from pino-loggly");
}, 2000);
