import { expect } from "chai";
import { SinonStub, stub } from "sinon";
import { ImportMock } from "ts-mock-imports";
import got from "got";

import { Logger } from "./logger";

describe("utils", () => {
  context("Logger: checking config", () => {
    it("log levels should be defined", () => {
      const logger = new Logger("", []);

      expect(logger).to.haveOwnProperty("levels");
      expect(logger.levels).to.haveOwnProperty("trace", 10);
      expect(logger.levels).to.haveOwnProperty("debug", 20);
      expect(logger.levels).to.haveOwnProperty("info", 30);
      expect(logger.levels).to.haveOwnProperty("warn", 40);
      expect(logger.levels).to.haveOwnProperty("error", 50);
      expect(logger.levels).to.haveOwnProperty("fatal", 60);
    });

    it("token and tags should be defined", () => {
      const token = "valid-token";
      const tags = ["test", "pino-loggly"];

      const logger = new Logger(token, tags);

      expect(logger).to.haveOwnProperty("token", token);
      expect(logger).to.haveOwnProperty("tags").of.lengthOf(2).contains(tags[0]).contains(tags[1]);
    });
  });

  context("Logger: log method happy path", () => {
    let gotPostStub: SinonStub;
    before(() => {
      gotPostStub = ImportMock.mockFunction(got, "post");
      gotPostStub.resolves("OK");
    });

    after(() => {
      gotPostStub.restore();
    });

    it("Expected to send log to Loggly when a valid token is passed", () => {
      const token = "valid-token";
      const tags = ["test", "2020"];
      const logger = new Logger(token, tags);

      const message = "Hello from tests";

      logger.log(message);

      expect(gotPostStub.calledOnce).to.be.equal(true);
      expect(gotPostStub.calledWith(`https://logs-01.loggly.com/inputs/${token}/tag/${tags.join(",")}`)).to.be.equal(true);
    });
  });

  context("Logger: log method unhappy path", () => {
    let gotPostStub: SinonStub;
    let stderrWrite: SinonStub;
    beforeEach(() => {
      stderrWrite = stub(process.stderr, "write");
      stderrWrite.callsFake((str: string) => {
        expect(JSON.parse(str)).to.haveOwnProperty("msg").contain("Response code 403 (Forbidden)");
        return true;
      });
      gotPostStub = ImportMock.mockFunction(got, "post");
      gotPostStub.rejects({
        message: "Response code 403 (Forbidden)",
      });
    });

    afterEach(() => {
      stderrWrite.restore();
      gotPostStub.restore();
    });

    it("Expected to not send log to Loggly when an invalid token is passed", () => {
      const token = "invalid-token";
      const tags = ["fail-test", "2020"];
      const logger = new Logger(token, tags);

      const message = "Hello from tests";

      logger.log(message, ["other-tag"]);

      expect(gotPostStub.calledOnce).to.be.equal(true);
      expect(gotPostStub.calledWith(`https://logs-01.loggly.com/inputs/${token}/tag/${tags.join(",")},other-tag`)).to.be.equal(true);
      setTimeout(() => { expect(stderrWrite.calledOnce).to.be.equal(true); });
    });
  });
});
