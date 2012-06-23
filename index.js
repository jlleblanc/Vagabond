var db = require('./database').db;
var express = require('express');

var app = express.createServer();

app.get('/*', function(req, res){
  
  db.collection('pages', {safe: true}, function  (err, collection) {
    if (err) {
      res.render('layout.ejs', {title: 'ERROR', body: 'error: ' + err});
    } else {
      collection.findOne({'url': req.url}, function  (err, item) {
        if (err) {
          res.render('layout.ejs', {title: 'ERROR', body: 'error: ' + err});
        } else {
          if (item) {
            res.render('layout.ejs', {title: item.title, body: item.body});
          } else {
            res.render('layout.ejs', {title: 'Not Found', body: 'item not found'});
          }
        }
      });
    }
  });

});

app.listen(3000);