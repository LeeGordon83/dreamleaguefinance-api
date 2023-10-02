module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jackpots', {
      jackpotId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start: {
        type: Sequelize.INTEGER
      },
      end: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jackpots')
  }
}
