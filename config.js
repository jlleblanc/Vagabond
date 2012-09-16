// TODO: Create some sort of factory to get the right configuration based on environment varible, etc...
module.exports = {
  port: 3000,
  admin_route: '/admin',
  login_route: '/login',
  logout_route: '/logout',
  session_secret: '234fasdklj932',
  db: {
    host: 'localhost',
    port: 27017,
    db_name: 'node_cms'
  }
};