const split = require('split2');
const pump = require('pump');
const Parse = require('fast-json-parse');
const through = require('through2');

const loggly = require('./utils');

module.exports = (options = {}) => {
  const { levels, ...logglyClient } = loggly(options);

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

    if (options.returnStream) {
      if (chunk.level >= levels[options.level]) {
        if (chunk.level <= levels.info) {
          setImmediate(() => process.stdout.write(JSON.stringify(chunk)));
        } else {
          setImmediate(() => process.stderr.write(JSON.stringify(chunk)));
        }
      }
    }

    cb();
  });

  pump(process.stdin, splitter, sendToLoggly);

  process.on('SIGINT', () => process.exit(0));

	return splitter;
};
