module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('managers', [{
      managerId: 1,
      name: 'Lee',
      active: true
    }, {
      managerId: 2,
      name: 'Billy',
      active: true
    }, {
      managerId: 3,
      name: 'John',
      active: true
    }], {
      ignoreDuplicates: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('managers', null, {})
  }
}
