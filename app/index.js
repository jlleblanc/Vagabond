exports.config = require('./config');
exports.auth = require('./auth');
exports.db = require('./database');

exports.init = function  () {
  exports.db.connect();
};