module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('userRoles', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      roleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('userRoles')
  }
}
