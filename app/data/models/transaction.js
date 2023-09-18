module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    value: DataTypes.DECIMAL(10,2),
    date: DataTypes.DATE,
    notes: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    weekId: DataTypes.INTEGER
  }, {
    tableName: 'transactions',
    freezeTableName: true,
    timestamps: false
  })
  Transaction.associate = function (models) {
  Transaction.associate = models => {
    Transaction.belongsTo(models.Manager, { foreignKey: "managerId" })
  }
  Transaction.associate = models => {
    Transaction.belongsTo(models.Week, { foreignKey: "weekId" })
  }
  Transaction.associate = models => {
    Transaction.belongsTo(models.TransactionType, { foreignKey: "transactionTypeId" })
  }

  }
  return Transaction
}
