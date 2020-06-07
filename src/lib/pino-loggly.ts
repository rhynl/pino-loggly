import { Transform } from "stream";
import split from "split2";
import pump from "pump";
import Parser from "fast-json-parse";
import through from "through2";

import { Logger } from "./logger";

/** SeverityLevel - log level severity according to Pino */
export type SeverityLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

export interface PinoLogglyOptions {
  /** list of tags to be passed to Loggly services */
  tags?: string[];
  /** API token to authorize against Loggly services */
  token: string;
  /** severy level from when logs should start to be sending to Loggly services */
  level?: SeverityLevel;
  /** should send logs to standard output/error after send logs to Loggly services */
  returnStream?: boolean;
}

export class PinoLoggly {
  private readonly token: string;
  private readonly level: string;
  private readonly returnStream: boolean;
  private readonly tags: string[];

  constructor(options: PinoLogglyOptions) {
    this.token = options.token;
    this.level = options.level ?? "info";
    this.returnStream = options.returnStream ?? false;
    this.tags = options.tags ?? [];
  }

  public init(): Transform {
    const logger = new Logger(this.token, this.tags);

    const splitter = split(function spltr(this: any, line) {
      console.log(JSON.stringify(line, undefined, 10));
      const { err, value } = new Parser(line);
      if (err) {
        this.emit("unknown", line, err);
        return;
      }

      return value;
    });

    const sendToLoggly = through.obj((chunk, enc, cb) => {
      logger.log(chunk.msg ?? chunk);

      if (this.returnStream) {
        if (chunk.level >= logger.levels[this.level]) {
          if (chunk.level <= logger.levels.info) {
            setImmediate(() => process.stdout.write(JSON.stringify(chunk) + "\n"));
          } else {
            setImmediate(() => process.stderr.write(JSON.stringify(chunk) + "\n"));
          }
        }
      }

      cb();
    });

    pump(process.stdin, splitter, sendToLoggly);

    process.on("SIGINT", () => process.exit(0));

    return splitter;
  }
}
