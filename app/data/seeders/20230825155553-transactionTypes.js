module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transactionTypes', [{
      transactionTypeId: 1,
      type: 'Fiver'
    }, {
      transactionTypeId: 2,
      type: 'Weekly'
    }, {
      transactionTypeId: 3,
      type: 'Ad-Hoc'
    }, {
      transactionTypeId: 4,
      type: 'Jackpot'
    }, {
      transactionTypeId: 5,
      type: 'League or Cup'
    }], {
      ignoreDuplicates: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('transactionTypes', null, {})
  }
}
