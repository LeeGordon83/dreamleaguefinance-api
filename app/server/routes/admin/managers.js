const { getManager, getManagers } = require('../../../managers')
const { GET } = require('../../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/admin/managers',
  options: {
    handler: async (_request, h) => {
      return h.response(await getManagers())
    }
  }
}, {
  method: GET,
  path: '/admin/manager',
  handler: async (request, h) => {
    return h.response(await getManager(request.query.managerId))
  }
}]
