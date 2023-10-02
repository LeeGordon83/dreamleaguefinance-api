module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weeks', {
      weekId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start: {
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
      },
      complete: {
        type: Sequelize.BOOLEAN
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('weeks')
  }
}
