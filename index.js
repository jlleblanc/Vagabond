// TODO: either put all of this in a try/catch or find a better way of 
// logging errors/create a debug mode

var server = require('./server'),
  app = require('./app'),
  router = require('./router');

app.init();

router(server, app);
server.listen(app.config.get('port')); 

if (app.config.get('repl') === true) {
  repl = require('repl');
  var prompt = repl.start({prompt: "vagabond> "});
  prompt.context.app = app;
  prompt.context.server = server;
}

module.exports = server;