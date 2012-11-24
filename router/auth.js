var passport = require('passport'),
  auth = {};

auth.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  falshFailure: true
});

auth.register = function  (req, res) {
  passport.register(req.body.username, req.body.password, function  () {
    res.redirect('/');
  });
};

auth.logout = function (req, res) {
  req.logOut();
  res.redirect('/');
};

module.exports = auth;
