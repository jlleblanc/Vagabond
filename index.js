var db = require('./database'),
  config = require('./config'),
  server = require('./server');

server.get('/*', function(req, res){

  var styles = ['/media/bootstrap/css/bootstrap.min.css'];

  db.Page.findOne({url: req.url}, function  (err, page) {
    if (err) {
      res.render('layout.hbs', {title: 'ERROR', body: 'error: ' + err, styles: styles});
    } else {
      if (page) {
        res.render('layout.hbs', {title: page.title, content: page.body, user: req.user, styles: styles});        
      } else {
        res.status(404).render('layout.hbs', {title: 'ERROR', body: 'Not Found', styles: styles});
      }
    }
  });

});

server.listen(config.port);