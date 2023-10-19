module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('fees', {
      feeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2)
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('fees')
  }
}
