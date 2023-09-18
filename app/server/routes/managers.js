const Joi = require('joi')
const boom = require('@hapi/boom')
const db = require('../../data')
const { getManager, getManagers } = require('../../managers')
const { GET, POST } = require('../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/managers',
  options: {
    handler: async (_request, h) => {
      return h.response(await getManagers())
    }
  }
}, {
  method: GET,
  path: '/manager',
  handler: async (request, h) => {
    return h.response(await getManager(request.query.managerId))
  }
}]
