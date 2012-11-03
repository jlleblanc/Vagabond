exports.find_user = function  (username, callback) {
  this.schema.findOne({username: username}, function  (err, user) {
    callback(user);
  });
};