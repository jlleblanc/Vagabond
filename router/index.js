module.exports = function (server, app) {

  // sessions
  server.add_route('post', app.config.get('login_route'), require('./auth').login);
  server.add_route('post', app.config.get('register_route'), require('./auth').register);
  server.add_route('get', app.config.get('logout_route'), require('./auth').logout);

  // admin
  server.add_route('get', app.config.get('admin_route'), require('./admin'));

  // pages
  server.add_route('get', '/*', require('./pages').route);
  server.add_route('post', '/*', require('./pages').create);

};