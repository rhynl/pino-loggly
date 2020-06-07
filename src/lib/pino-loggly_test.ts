import { expect } from "chai";

import { PinoLoggly, PinoLogglyOptions, SeverityLevel } from "./pino-loggly";

describe("loggly", () => {
  it("Can create a instance of PinoLoggly", () => {
    const level: SeverityLevel = "debug";
    const returnStream = true;
    const tags = ["test", "pino-loggly"];
    const token = "valid-token";
    const options: PinoLogglyOptions = {
      token,
      level,
      tags,
      returnStream,
    };
    const loggerOne = new PinoLoggly(options);

    expect(loggerOne).to.haveOwnProperty("token", token);
    expect(loggerOne).to.haveOwnProperty("level", level);
    expect(loggerOne).to.haveOwnProperty("returnStream", returnStream);
    expect(loggerOne).to.haveOwnProperty("tags").with.lengthOf(2).contains(tags[0]).contains(tags[1]);

    const loggerTwo = new PinoLoggly({ token });

    expect(loggerTwo).to.haveOwnProperty("token", token);
    expect(loggerTwo).to.haveOwnProperty("level", "info");
    expect(loggerTwo).to.haveOwnProperty("returnStream", false);
    expect(loggerTwo).to.haveOwnProperty("tags").with.lengthOf(0);
  });

  it("logger init returns a transport", () => {
    const level: SeverityLevel = "debug";
    const returnStream = false;
    const tags = ["test", "pino-loggly"];
    const token = "valid-token";
    const options: PinoLogglyOptions = {
      token,
      level,
      tags,
      returnStream,
    };
    const logger = new PinoLoggly(options);

    const stream = logger.init();

    expect(typeof stream.write).to.be.equal("function");
    expect(typeof stream.writable).to.be.equal("boolean");
    expect(typeof stream._transform).to.be.equal("function");
    expect(typeof stream._flush).to.be.equal("function");

    stream.write({ "level": 30, "time": 1591571360820, "pid": 51662, "hostname": "mac-rhynl-io.local", "msg": "Everythig is ok!" });

    stream.end();
  });
});
