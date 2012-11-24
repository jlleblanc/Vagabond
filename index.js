// TODO: either put all of this in a try/catch or find a better way of 
// logging errors/create a debug mode

var server = require('./lib/server'),
  conf = require('./lib/config'),
  router = require('./router');

router(server);
server.listen(conf.get('port')); 

module.exports = server;