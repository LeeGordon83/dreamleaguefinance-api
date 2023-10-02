const { getAllTransactions } = require('../../../finance')
const { GET } = require('../../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/finance/all-transactions',
  options: {
    handler: async (_request, h) => {
      const transactions = await getAllTransactions()
      return h.response(transactions)
    }
  }
}]
