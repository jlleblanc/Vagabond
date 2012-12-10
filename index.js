// TODO: either put all of this in a try/catch or find a better way of 
// logging errors/create a debug mode

var app = require('./app'),
  router = require('./router');

app.init();

var server = require('./server')(app);
router(server, app);

console.info('Vagabond server started on port ' + app.config.get('port'));

module.exports = server;