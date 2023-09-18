module.exports = (sequelize, DataTypes) => {
  const TransactionType = sequelize.define('TransactionType', {
    transactionTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
  }, {
    tableName: 'transactionTypes',
    freezeTableName: true,
    timestamps: false
  })

  TransactionType.associate = function (models) {
    TransactionType.hasMany(models.Transaction, {
      foreignKey: 'transactionTypeId',
      as: 'transationType',
      onDelete: 'CASCADE'
    })
  }
  return TransactionType
}
