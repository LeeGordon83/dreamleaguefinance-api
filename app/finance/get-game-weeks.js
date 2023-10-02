const db = require('../data')

const getGameWeeks = async () => {
  const weeks = await db.Week.findAll()
  return weeks
}

module.exports = {
  getGameWeeks
}
