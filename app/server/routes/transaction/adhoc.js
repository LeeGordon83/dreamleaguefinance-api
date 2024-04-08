const { getManagers } = require('../../../managers')
const { GET, POST } = require('../../../constants/verbs')
const joi = require('joi')
const { boomify } = require('@hapi/boom')
const { adhocTransaction } = require('../../../transactions')

module.exports = [{
  method: GET,
  path: '/transaction/adhoc',
  options: {
    handler: async (_request, h) => {
      return h.response(await getManagers())
    }
  }
},  {
  method: POST,
  path: '/transaction/adhoc',
  options: {
    validate: {
      payload: joi.object({
        amountPaid: joi.number().required(),
        managerSelect: joi.number().required(),
        notes: joi.string().allow('', null)
      }),
      failAction: async (request, h, error) => {
        return boomify.badRequest(error)
      }
    },
    handler: async (request, h) => {
      return h.response(await adhocTransaction(request.payload))
  }
}
}]


