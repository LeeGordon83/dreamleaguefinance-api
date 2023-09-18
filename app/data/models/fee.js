module.exports = (sequelize, DataTypes) => {
  const Fee = sequelize.define('Fee', {
    feeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10,2)
  }, {
    tableName: 'fees',
    freezeTableName: true,
    timestamps: false
  })

  return Fee
}
