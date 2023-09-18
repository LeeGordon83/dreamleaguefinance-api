module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    managerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {
    tableName: 'managers',
    freezeTableName: true,
    timestamps: false
  })
  Manager.associate = function (models) {
    Manager.hasMany(models.Email, {
      foreignKey: 'managerId',
      as: 'emails',
      onDelete: 'CASCADE'
    })
    Manager.associate = models => {
      Manager.belongsTo(models.Balance, { foreignKey: "managerId" })
    }
    Manager.associate = models => {
      Manager.belongsTo(models.Transaction, { foreignKey: "managerId" })
    }

  }
  return Manager
}
