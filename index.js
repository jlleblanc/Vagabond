// TODO: either put all of this in a try/catch or find a better way of 
// logging errors/create a debug mode

var server = require('./server'),
  app = require('./app'),
  router = require('./router');

router(server, app);
server.listen(app.config.get('port')); 

module.exports = server;