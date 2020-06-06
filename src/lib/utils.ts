import got, { OptionsOfTextResponseBody } from "got";

/**
 * Logger - This class allows to prepare a client
 * that can send logs directly to Loggly
 */
export class Logger {
  private readonly URL = "https://logs-01.loggly.com/inputs";
  public readonly levels: { [name: string]: number; } = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  };
  private sendTo: string;

  /**
   * Logger - This class allows to prepare a client
   * that can send logs directly to Loggly
   */
  constructor(
    private readonly token: string,
    private readonly tags: string[],
  ) {
    this.sendTo = this.URL + "/" + this.token + "/tag/";
  }

  /** log - send logs to Loggly */
  public log(body: string, newTags: string[] = []): void {
    const tags = Array.from(this.tags);
    tags.push(...newTags);

    const sendTo = this.sendTo + tags.join(",");

    const gotOptions: OptionsOfTextResponseBody = {
      method: "POST",
      body: JSON.stringify(body),
    };

    got(sendTo, gotOptions);
  }
}
