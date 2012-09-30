var express = require('express'),
  config = require('./config'),
  db = require('./database'),
  passport = require('./auth').passport;

// Initialize Express

var server = express();

server.use(express.cookieParser());
server.use(express.bodyParser());
server.use(express.session({secret: config.get('session_secret')}));
server.use(passport.initialize());
server.use(passport.session());

server.set('view engine', 'hbs');
server.set('views', __dirname + '/../views');

server.use(express.static(__dirname + '/../public'));

// TODO: come up with an account creation process
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("secret", salt);

module.exports = server;