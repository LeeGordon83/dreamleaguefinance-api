const db = require('../data')

const getManagers = async () => {
  var managers = db.Manager.findAll({ order: ['name'] })
  console.log(managers)
  return managers
}

module.exports = {
  getManagers
}
