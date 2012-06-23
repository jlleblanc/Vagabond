var db = require('./database').db;
var express = require('express');

var app = express.createServer();
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/admin', function  (req, res) {
  res.render('admin.ejs', {title: 'Admin'});
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