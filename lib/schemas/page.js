var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
  url: String,
  title: String,
  body: String,
  layout: String,
  fields: Object
});

module.exports = mongoose.model('pages', pageSchema);