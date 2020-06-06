import { expect } from "chai";
import { Logger } from "./utils";

const logger = new Logger("valid-token", ["2020", "pino-loggly"]);

describe("utils", () => {
  it("Hello there", () => {
    expect(true).to.be.equals(true);
  });
});
