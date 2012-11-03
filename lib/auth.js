var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt'),
  user = require('./database').load_model('user');

// Configure Passport

passport.use(new LocalStrategy(
  function(username, password, done) {
    user.find_user(username, function  (user) {
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
  user.find_user(username, function  (user) {
    done(null, user);
  });
});

module.exports.passport = passport;