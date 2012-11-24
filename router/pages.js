var page = require('../app').db.load_model('page');

exports.route = function (req, res){
  var scripts = [
    '/media/js/jquery-1.7.2.min.js',
    '/media/bootstrap/js/bootstrap.min.js',
    '/media/bootstrap/js/bootstrap-dropdown.js'
    ];
  var styles = ['/media/bootstrap/css/bootstrap.min.css'];

  page.findPage(req.url, function (doc) {
    if (doc) {
      res.render('layout.hbs', {title: doc.title, content: doc.body, user: req.user, scripts: scripts, styles: styles, message: res.locals.message});
    } else {
      res.status(404).render('layout.hbs', {title: 'ERROR', body: 'Not Found', styles: styles, message: res.locals.message});
    }
  });

};

exports.create = function  (req, res) {
  //todo
};