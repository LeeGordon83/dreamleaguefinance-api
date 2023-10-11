const { getSeasonData } = require('../../../admin')
const { GET } = require('../../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/admin/season',
  options: {
    handler: async (_request, h) => {
      const seasonData = await getSeasonData()
      return h.response(seasonData)
    }
  }
}]
