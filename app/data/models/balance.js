module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define('Balance', {
    balanceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    managerId: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL(10, 2)
  }, {
    tableName: 'balances',
    freezeTableName: true,
    timestamps: false
  })
  Balance.associate = function (models) {
    Balance.hasOne(models.Manager, {
      foreignKey: 'managerId',
      onDelete: 'CASCADE'
    })
  }
  return Balance
}
