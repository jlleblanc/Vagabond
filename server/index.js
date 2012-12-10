var express = require('express');

var Server = function (app, auth) {
  server = express();

  server.use(express.cookieParser());
  server.use(express.bodyParser());
  server.use(express.session({secret: app.config.get('session_secret')}));
  server.use(auth.initialize());
  server.use(auth.session());

  server.set('view engine', 'hbs');
  server.set('views', __dirname + '/../views');

  server.use(express.static(__dirname + '/../public'));

  this.server = server;
};

Server.prototype.add_route = function (verb, route, method) {
  verb = verb.toLowerCase();
  this.server[verb](route, method);
};

Server.prototype.start = function (port) {
  this.server.listen(port);
};

module.exports = function (app) {
  var server = new Server(app, app.auth);
  server.start(app.config.get('port'));

  return server;
};
