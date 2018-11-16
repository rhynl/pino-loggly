const got = require('got');

const logglyUrl = 'https://logs-01.loggly.com/inputs';

// pino levels of severity
const levels = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};


module.exports = (opts) => {
  const { token, tags, json } = opts;

  function log(body = '', newtTags = []) {
    tags.push(newtTags);

    const sendTo = `${logglyUrl}/${token}/tag/${tags.join(',')}`;

    got(sendTo, {
      method: 'POST',
      body: json ? JSON.stringify(body) : body,
      json,
    });
  }

  return {
    levels,
    log,
  };
};
