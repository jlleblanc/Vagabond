exports.findPage = function  (url, callback) {
  this.schema.findOne({url: url}, function  (err, page) {
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
  this.schema.findPage(url, function  (existing_page) {
    if (existing_page) {
      throw "Page already created";
    }
    
    var page = new this.schema({
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