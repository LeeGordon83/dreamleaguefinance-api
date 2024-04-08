const routes = [].concat(
  // require('../routes/identity/login'),
  // require('../routes/identity/register'),
  // require('../routes/identity/forgot-password'),
  // require('../routes/identity/reset-password'),
  require('../routes/admin/managers'),
  require('../routes/admin/prizes'),
  require('../routes/admin/fees'),
  require('../routes/admin/season'),
  require('../routes/finance/all-transactions'),
  require('../routes/finance/game-weeks'),
  require('../routes/finance/paid-in'),
  require('../routes/finance/credit'),
  require('../routes/finance/balance'),
  require('../routes/finance/individual-winnings'),
  require('../routes/finance/winnings'),
  require('../routes/transaction/adhoc'),
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route(routes)
    }
  }
}
