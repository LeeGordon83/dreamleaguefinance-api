const { getIndividualWinnings } = require('../../../finance')
const { GET } = require('../../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/finance/individual-winnings',
  options: {
    handler: async (_request, h) => {
      const individualWinnings = await getIndividualWinnings()
      return h.response(individualWinnings)
    }
  }
}]
