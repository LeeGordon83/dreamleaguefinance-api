const routes = [].concat(
  // require('../routes/identity/login'),
  // require('../routes/identity/register'),
  // require('../routes/identity/forgot-password'),
  // require('../routes/identity/reset-password')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route(routes)
    }
  }
}
