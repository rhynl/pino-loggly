const split = require('split2');
const pump = require('pump');
const Parse = require('fast-json-parse');
const through = require('through2');

const loggly = require('../src/loggly');

module.exports = (options = {}) => {
  const logglyClient = loggly(options);

  const splitter = split((line) => {
    const { err, value } = new Parse(line);
    if (err) {
      this.emit('unknown', line, err);
      return null;
    }

    return value;
  });

  const sendToLoggly = through.obj((chunk, enc, cb) => {
    logglyClient.log(chunk.msg);
    cb();
  });

  pump(process.stdin, splitter, sendToLoggly);

	return splitter;
};
