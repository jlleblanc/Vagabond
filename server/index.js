var express = require('express'),
  app = require('../app');

// Initialize Express

var server = express();

server.use(express.cookieParser());
server.use(express.bodyParser());
server.use(express.session({secret: app.config.get('session_secret')}));
server.use(app.auth.initialize());
server.use(app.auth.session());

server.set('view engine', 'hbs');
server.set('views', __dirname + '/../views');

server.use(express.static(__dirname + '/../public'));

module.exports = server;