var express = require('express'),
  config = require('./config'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  db = require('./database');

// Initialize Express

var app = express.createServer();

// app.use(express.session({secret: config.session_secret}));
// app.use(passport.initialize());
// app.use(passport.session());

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get(config.admin_route, function  (req, res) {
  var scripts = [
    '/media/js/jquery-1.7.2.min.js',
    '/media/bootstrap/js/bootstrap.min.js',
    '/media/bootstrap/js/bootstrap-dropdown.js'
    ];
  var styles = ['/media/bootstrap/css/bootstrap.min.css'];
  
  res.render('admin.hbs', {title: 'Admin', scripts: scripts, styles: styles});
});

// Configure Passport

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     db.collection('users', {safe: true}, function  (err, collection) {
//       collection.findOne({ username: username }, function  (err, user) {
//         if (!user) {
//           return done(null, false, { message: 'Unknown user' });
//         }
// 
//         // TODO: validate password!
// 
//         return done(null, user);
//       });
//     });
//   }
// ));

module.exports = app;