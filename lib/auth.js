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

// Registration
passport.register = function(username, password) {
  // Check if a username is registered
  User.findOne({username: username}, function  (err, user) {
    if (user) {
      console.log('user already registered');
      return false;
    }

    // Generate the salt for the password
    bcrypt.genSalt(10, function(err, salt) {
      // Hash the password
      bcrypt.hash(password, salt, function(err, hash) {

        // Create the user document and save
        var registered = new User({username: username, password: hash});
        registered.save(function(error) {
          if (error)  {
            console.log('could not save user');
            return false;
          }
          console.log('saved');
          return true;
        });
      });
    });
  });
};

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  User.findOne({username: username}, function  (err, user) {
    done(null, user);
  });
});

module.exports.passport = passport;