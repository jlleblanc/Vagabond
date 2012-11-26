var mongoose = require('mongoose'),
  config = require('../config');

exports.connect = function  () {
  mongoose.connect("mongodb://" + config.get('db:host') + ":" + config.get('db:port') + "/" + config.get('db:db_name'));
};

exports.load_model = function  (name) {
  var model = require('./models/' + name);
  model.schema = require('./schemas/' + name);

  return model;
};