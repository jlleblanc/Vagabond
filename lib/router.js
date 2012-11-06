var config = require('./config'),
  passport = require('passport'),
  page = require('./page');

var defaultRoute = function (req, res){
  var scripts = [
    '/media/js/jquery-1.7.2.min.js',
    '/media/bootstrap/js/bootstrap.min.js',
    '/media/bootstrap/js/bootstrap-dropdown.js'
    ];
  var styles = ['/media/bootstrap/css/bootstrap.min.css'];

  page.findPage(req.url, function (found_page) {
    if (found_page) {
      res.render('layout.hbs', {title: page.title, content: page.body, user: req.user, scripts: scripts, styles: styles, message: res.locals.message});
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

var addRoutes = function(server) {

  server.post(config.get('login_route'), passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    falshFailure: true
  }));

  // Registration route
  server.post(config.get('register_route'), function(req, res) {
    if (passport.register(req.body.username, req.body.password)) {
      passport.authenticate('local', {
        successRedirect: config.get('admin_route'),
        failureRedirect: '/',
        falshFailure: true
      });
    }
    else {
      res.redirect(config.get('login_route'));
    }
  });

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