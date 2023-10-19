module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    value: DataTypes.DECIMAL(10, 2),
    date: DataTypes.DATE,
    notes: DataTypes.STRING,
    transactionTypeId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    weekId: DataTypes.INTEGER
  }, {
    tableName: 'transactions',
    freezeTableName: true,
    timestamps: false
  })
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Manager, { foreignKey: 'managerId', as: 'manager' })
    Transaction.belongsTo(models.Week, { foreignKey: 'weekId' })
    Transaction.belongsTo(models.TransactionType, { foreignKey: 'transactionTypeId', as: 'transactionType' })
  }

  return Transaction
}
