db.collection('pages', function(err, collection) {
  if (err) {
    console.log(err);
  } else {
    console.log('pages');
    var page = {'url': '/', 'title': 'Home Page', 'body': 'This is the home page.'};
    collection.insert(page);
    page = {'url': '/about', 'title': 'About us', 'body': 'Why do we exist? That is the question. Might induce some ennui.'};
    collection.insert(page);
  }
});

db.collection('users', function(err, collection) {
  if (err) {
    console.log(err);
  } else {
    console.log('users');
    var user = {'username': 'admin'};
    collection.insert(user);
  }
});
