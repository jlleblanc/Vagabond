var bcrypt = require('bcrypt');

exports.find_user = function  (username, callback) {
  this.schema.findOne({username: username}, function  (err, user) {
    callback(user);
  });
};

exports.create_user = function  (username, password, callback) {

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  var user = new this.schema({
    username: username, 
    password: hash
  });

  user.save(function  (err) {
    if (err) {
      throw "Create user: " + err;
    }

    callback();
  });

};