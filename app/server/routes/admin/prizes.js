const { getPrizes } = require('../../../admin')
const { GET } = require('../../../constants/verbs')


module.exports = [{
  method: GET,
  path: '/admin/prizes',
  options: {
    handler: async (_request, h) => {
      const prizes = await getPrizes()
      return h.response(prizes)
    }
  }
}]
