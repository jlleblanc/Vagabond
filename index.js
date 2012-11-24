// TODO: either put all of this in a try/catch or find a better way of 
// logging errors/create a debug mode

var server = require('./lib/server'),
  router = require('./router');

router(server);
server.listen(server.config.get('port')); 

module.exports = server;