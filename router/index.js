module.exports = function (server) {

  // sessions
  server.post(server.config.get('login_route'), require('./auth').login);
  server.post(server.config.get('register_route'), require('./auth').register);
  server.get(server.config.get('logout_route'), require('./auth').logout);

  // admin
  server.get(server.config.get('admin_route'), require('./admin'));

  // pages
  server.get('/*', require('./pages').route);
  server.post('/*', require('./pages').create);
  
};