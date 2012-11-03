var Page = require('./schemas/page');

exports.findPage = function  (url, callback) {
  Page.findOne({url: url}, function  (err, page) {
    if (err) {
      throw "Page error: " + err;
    } else {
      if (page) {
        callback(page);
      } else {
        callback(false);
      }
    }
  });

};

exports.createPage = function  (url, data, callback) {
  exports.findPage(url, function  (page) {
    if (page) {
      throw "Page already created";
    }
    
    var page = new Page({
      url: url,
      title: data.title,
      fields: data.fields,
      layout: data.layout
    });
    
    page.save(function  (err) {
      if (err) {
        throw "Page save: " + err;
      }
      
      callback();
    });

  });
};