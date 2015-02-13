var through = require('through2');
var util = require("util");
var path = require("path");
var compiler = require('components-ember/ember-template-compiler');

module.exports = function (b, opts) {
  if (['.hbs'].indexOf(path.extname(b)) === -1) {
    return through();
  }

  var input = '';
  function read(data, encoding, callback) {
    input += data;
    callback();
  }

  function end() {
    this.push(util.format("module.exports = Ember.Handlebars.template(%s);\n",
      compiler.precompile(input, false)));
    this.push(null);
  }

  return through(read, end);
};
