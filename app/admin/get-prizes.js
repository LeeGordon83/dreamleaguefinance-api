const db = require('../data')

const getPrizes = async () => {
  return db.Prize.findAll({
    order: [
      ['league', 'DESC'], // Sort by 'league' in descending order (true first)
      ['amount', 'DESC'] // Then sort by 'amount' in descending order
    ]
  })
}

module.exports = {
  getPrizes
}
