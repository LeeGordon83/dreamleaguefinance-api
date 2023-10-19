'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the table
    await queryInterface.dropTable('prizes')

    // Recreate the table with the desired schema
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
      },
      cup: {
        type: Sequelize.BOOLEAN
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prizes')
  }
}
