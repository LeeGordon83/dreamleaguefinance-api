const { getBalance } = require('../../../finance')
const { GET } = require('../../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/finance/balance',
  options: {
    handler: async (_request, h) => {
      const balance = await getBalance()
      return h.response(balance)
    }
  }
}]
