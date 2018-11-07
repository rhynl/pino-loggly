const got = require('got');

const logglyUrl = 'https://logs-01.loggly.com/inputs';

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
    log,
  };
};
