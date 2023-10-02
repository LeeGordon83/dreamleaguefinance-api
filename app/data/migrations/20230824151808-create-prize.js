module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prizes', {
      prizeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      league: {
        type: Sequelize.BOOLEAN
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prizes')
  }
}
