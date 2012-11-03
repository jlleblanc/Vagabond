exports.load_model = function  (name) {
  var model = require('./models/' + name);
  model.schema = require('./schemas/' + name);

  return model;
};