module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactionTypes', {
      transactionTypeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactionTypes')
  }
}
