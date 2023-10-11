const { getFees } = require('../../../admin')
const { GET } = require('../../../constants/verbs')


module.exports = [{
  method: GET,
  path: '/admin/fees',
  options: {
    handler: async (_request, h) => {
      const fees = await getFees()
      return h.response(fees)
    }
  }
}]
