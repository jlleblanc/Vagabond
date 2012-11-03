var config = require('./config'),
  passport = require('passport'),
  page = require('./database').load_model('page');

var defaultRoute = function(req, res){

  var styles = ['/media/bootstrap/css/bootstrap.min.css'];

  page.findPage(req.url, function (found_page) {
    if (found_page) {
      res.render('layout.hbs', {title: found_page.title, content: found_page.body, user: req.user, styles: styles});
    } else {
      res.status(404).render('layout.hbs', {title: 'ERROR', body: 'Not Found', styles: styles});
    }
  });

};

var adminRoute = function  (req, res) {
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
    successRedirect: "/",
    failureRedirect: "/",
    falshFailure: true
  }));

  server.get(config.get('logout_route'), function  (req, res) {
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