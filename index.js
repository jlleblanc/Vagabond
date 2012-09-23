var db = require('./database'),
  config = require('./config'),
  server = require('./server');

server.get('/*', function(req, res){
  
  db.Page.findOne({url: req.url}, function  (err, page) {
    if (err) {
      res.render('layout.hbs', {title: 'ERROR', body: 'error: ' + err});
    } else {
      if (page) {
        res.render('layout.hbs', {title: page.title, content: page.body, user: req.user});        
      } else {
        res.status(404).render('layout.hbs', {title: 'ERROR', body: 'Not Found'});
      }
    }
  });

});

server.listen(config.port);