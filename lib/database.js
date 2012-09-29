var mongoose = require('mongoose'),
  config = require('./config');

var db = mongoose.createConnection(config.get('db:host'), config.get('db:db_name'), config.get('db:port'));

db.once('open', function () {
  module.exports.Page = db.model('pages', new mongoose.Schema({
    url: String,
    title: String,
    body: String
  }));

  module.exports.User = db.model('users', new mongoose.Schema({
    username: String,
    password: String
  }));
  
  console.log("We are connected");
});

db.on('error', console.error.bind(console, 'connection error:'));

module.exports.db = db;