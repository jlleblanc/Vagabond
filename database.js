var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('node_cms', server);

db.open(function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
  
  // db.collection('pages', function(err, collection) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('made it');
  //     var page = {'url': '/', 'title': 'Home Page', 'body': 'This is the home page.'};
  //     collection.insert(page);
  //     page = {'url': '/about', 'title': 'About us', 'body': 'Why do we exist? That is the question. Might induce some ennui.'};
  //     collection.insert(page);
  //   }
  // });
  
});

exports.db = db;