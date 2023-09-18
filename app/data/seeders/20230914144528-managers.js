module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('managers', [{
      managerId: 1,
      name: 'Lee'
    }, {
      managerId: 2,
      name: 'Billy'
    }, {
      managerId: 3,
      name: 'John'
    }], {
      ignoreDuplicates: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('managers', null, {})
  }
}
