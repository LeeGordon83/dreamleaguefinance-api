const routes = [].concat(
  // require('../routes/identity/login'),
  // require('../routes/identity/register'),
  // require('../routes/identity/forgot-password'),
  // require('../routes/identity/reset-password'),
  require('../routes/admin/managers'),
  require('../routes/finance/all-transactions'),
  require('../routes/finance/game-weeks'),
  require('../routes/finance/paid-in'),
  require('../routes/admin/season'),
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route(routes)
    }
  }
}
