var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt'),
  User = require('./models/user');

// Configure Passport

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function  (err, user) {
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      }

      return done(null, false, { message: 'Invalid credentials' });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  User.findOne({username: username}, function  (err, user) {
    done(null, user);
  });
});

module.exports.passport = passport;