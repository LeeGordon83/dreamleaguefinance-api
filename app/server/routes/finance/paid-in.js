const { getPaidIn } = require('../../../finance')
const { GET } = require('../../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/finance/paid-in',
  options: {
    handler: async (_request, h) => {
      const paidIn = await getPaidIn()
      return h.response(paidIn)
    }
  }
}]
