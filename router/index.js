var config = require('../lib/config');

module.exports = function (server) {

  // sessions
  server.post(config.get('login_route'), require('./auth').login);
  server.post(config.get('register_route'), require('./auth').register);
  server.get(config.get('logout_route'), require('./auth').logout);

  // admin
  server.get(config.get('admin_route'), require('./admin'));

  // pages
  server.get('/*', require('./pages').route);
  server.post('/*', require('./pages').create);
  
};