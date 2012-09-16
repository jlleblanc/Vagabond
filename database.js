var mongoose = require('mongoose'),
  config = require('./config').db;

var db = mongoose.createConnection(config.host, config.db_name, config.port);

db.once('open', function () {
  module.exports.Page = db.model('pages', new mongoose.Schema({
    url: String,
    title: String,
    body: String
  }));

  module.exports.User = db.model('users', new mongoose.Schema({
    username: String
  }));
  
  console.log("We are connected");
});

db.on('error', console.error.bind(console, 'connection error:'));

module.exports.db = db;