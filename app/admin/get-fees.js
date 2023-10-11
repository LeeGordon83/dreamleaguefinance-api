const db = require('../data');

const getFees = async () => {
  return db.Fee.findAll({
    order: [
      ['amount', 'DESC'], // Then sort by 'amount' in descending order
    ],
  })
}

module.exports = {
  getFees
}
