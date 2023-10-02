const { getGameWeeks } = require('../../../finance')
const { GET } = require('../../../constants/verbs')


module.exports = [{
  method: GET,
  path: '/finance/game-weeks',
  options: {
    handler: async (_request, h) => {
      const gameWeeks = await getGameWeeks()
      return h.response(gameWeeks)
    }
  }
}]
