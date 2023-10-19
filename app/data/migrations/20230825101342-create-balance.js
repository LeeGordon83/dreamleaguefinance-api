module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('balances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      managerId: {
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.DECIMAL
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('balances')
  }
}
