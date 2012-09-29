var express = require('express'),
  config = require('./config'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  db = require('./database'),
  bcrypt = require('bcrypt');

// Initialize Express

var app = express();

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret: config.get('session_secret')}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs');
app.set('views', __dirname + '/../views');

app.use(express.static(__dirname + '/../public'));

app.get(config.get('admin_route'), function  (req, res) {
  var scripts = [
    '/media/js/jquery-1.7.2.min.js',
    '/media/bootstrap/js/bootstrap.min.js',
    '/media/bootstrap/js/bootstrap-dropdown.js'
    ];
  var styles = ['/media/bootstrap/css/bootstrap.min.css'];
  
  res.render('admin.hbs', {title: 'Admin', scripts: scripts, styles: styles});
});

// Configure Passport

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.findOne({username: username}, function  (err, user) {
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
  db.User.findOne({username: username}, function  (err, user) {
    done(null, user);
  });
});

app.post(config.get('login_route'), passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/",
  falshFailure: true
}));

app.get(config.get('logout_route'), function  (req, res) {
  req.logOut();
  res.redirect('/');
});

// TODO: come up with an account creation process
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("secret", salt);

module.exports = app;