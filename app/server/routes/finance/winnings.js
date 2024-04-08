const { getWinnings } = require('../../../finance')
const { GET } = require('../../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/finance/winnings',
  options: {
    handler: async (_request, h) => {
      const winnings = await getWinnings()
      return h.response(winnings)
    }
  }
}]
