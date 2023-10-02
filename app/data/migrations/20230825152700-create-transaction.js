module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      transactionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.DECIMAL
      },
      date: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.STRING
      },
      transactionTypeId: {
        type: Sequelize.INTEGER
      },
      managerId: {
        type: Sequelize.INTEGER
      },
      weekId: {
        type: Sequelize.INTEGER
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions')
  }
}
