exports.config = require('./config');
exports.auth = require('./auth');
exports.db = require('./database');

exports.db.connect(exports.config.get('db:host'), exports.config.get('db:port'), exports.config.get('db:db_name'));