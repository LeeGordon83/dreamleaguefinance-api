const db = require('../data')

const getManagers = async () => {
  const managers = await db.Manager.findAll({
    include: [{
       model: db.Email,
       as: 'emails' }] 
  })

  return managers
}

module.exports = {
  getManagers
}
