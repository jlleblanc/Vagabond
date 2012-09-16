var db = require('./database');
var config = require('./config');
var server = require('./server');

server.get('/*', function(req, res){
  
  db.Page.find({url: req.url}, function  (err, page) {
    if (err) {
      res.render('layout.hbs', {title: 'ERROR', body: 'error: ' + err});
    } else {
      if (page.length) {
        page = page[0];
        res.render('layout.hbs', {title: page.title, body: page.body});        
      } else {
        res.status(404).render('layout.hbs', {title: 'ERROR', body: 'Not Found'});
      }
    }
  });

});

server.listen(config.port);