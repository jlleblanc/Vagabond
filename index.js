// TODO: either put all of this in a try/catch or find a better way of 
// logging errors/create a debug mode

var db = require('./lib/database'),
  server = require('./lib/server'),
  conf = require('./lib/config'),
  router = require('./lib/router');
  
router.addRoutes(server);
server.listen(conf.get('port')); 

module.exports = server;