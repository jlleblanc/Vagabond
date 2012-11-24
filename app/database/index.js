mongoose = require('mongoose');

exports.connect = function  (host, port, name) {
  mongoose.connect("mongodb://" + host + ":" + port + "/" + name);
};

exports.load_model = function  (name) {
  var model = require('./models/' + name);
  model.schema = require('./schemas/' + name);

  return model;
};