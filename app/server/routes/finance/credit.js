const { getCredit } = require('../../../finance')
const { GET } = require('../../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/finance/credit',
  options: {
    handler: async (_request, h) => {
      const credit = await getCredit()
      return h.response(credit)
    }
  }
}]
