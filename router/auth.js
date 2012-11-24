var passport = require('passport');

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  falshFailure: true
});

exports.register = function  (req, res) {
  passport.register(req.body.username, req.body.password, function  () {
    res.redirect('/');
  });
};

exports.logout = function (req, res) {
  req.logOut();
  res.redirect('/');
};
