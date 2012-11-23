var config = require('./config'),
  passport = require('passport'),
  page = require('./database').load_model('page');

var defaultRoute = function (req, res){
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

var adminRoute = function (req, res) {
  var scripts = [
    '/media/js/jquery-1.7.2.min.js',
    '/media/bootstrap/js/bootstrap.min.js',
    '/media/bootstrap/js/bootstrap-dropdown.js'
    ];
  var styles = ['/media/bootstrap/css/bootstrap.min.css'];

  res.render('admin.hbs', {title: 'Admin', scripts: scripts, styles: styles, user: req.user});
};

var createPageRoute = function (req, res) {

};

var registerRoute = function  (req, res) {
  passport.register(req.body.username, req.body.password, function  () {
    res.redirect('/');
  });
};

var addRoutes = function(server) {

  server.post(config.get('login_route'), passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    falshFailure: true
  }));

  // Registration route
  server.post(config.get('register_route'), registerRoute);

  server.get(config.get('logout_route'), function (req, res) {
    req.logOut();
    res.redirect('/');
  });

  server.get(config.get('admin_route'), adminRoute);

  server.get('/*', defaultRoute);

  server.post('/*', createPageRoute);
};

module.exports.addRoutes = addRoutes;
module.exports.defaultRoute = defaultRoute;
module.exports.adminRoute = adminRoute;