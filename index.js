var db = require('./database').db;
var express = require('express');

var app = express.createServer();
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/admin', function  (req, res) {
  var scripts = [
    '/media/js/jquery-1.7.2.min.js',
    '/media/bootstrap/js/bootstrap.min.js',
    '/media/bootstrap/js/bootstrap-dropdown.js'
    ];
  var styles = ['/media/bootstrap/css/bootstrap.min.css'];
  
  res.render('admin.hbs', {title: 'Admin', scripts: scripts, styles: styles});
});

app.get('/*', function(req, res){
  
  db.collection('pages', {safe: true}, function  (err, collection) {
    if (err) {
      res.render('layout.hbs', {title: 'ERROR', body: 'error: ' + err});
    } else {
      collection.findOne({'url': req.url}, function  (err, item) {
        if (err) {
          res.render('layout.hbs', {title: 'ERROR', body: 'error: ' + err});
        } else {
          if (item) {
            res.render('layout.hbs', {title: item.title, body: item.body});
          } else {
            res.render('layout.hbs', {title: 'Not Found', body: 'item not found'});
          }
        }
      });
    }
  });

});

app.listen(3000);