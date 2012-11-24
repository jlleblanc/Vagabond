module.exports = function (server, app) {

  // sessions
  server.post(app.config.get('login_route'), require('./auth').login);
  server.post(app.config.get('register_route'), require('./auth').register);
  server.get(app.config.get('logout_route'), require('./auth').logout);

  // admin
  server.get(app.config.get('admin_route'), require('./admin'));

  // pages
  server.get('/*', require('./pages').route);
  server.post('/*', require('./pages').create);
  
};