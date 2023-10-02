module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('histories', {
      historyId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING
      },
      mostWon: {
        type: Sequelize.STRING
      },
      mostFivers: {
        type: Sequelize.STRING
      },
      leastFivers: {
        type: Sequelize.STRING
      },
      mostWeekly: {
        type: Sequelize.STRING
      },
      leastWeekly: {
        type: Sequelize.STRING
      },
      biggestJackpot: {
        type: Sequelize.STRING
      },
      managers: {
        type: Sequelize.INTEGER
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('histories')
  }
}
