module.exports = (sequelize, DataTypes) => {
  const Prize = sequelize.define('Prize', {
    prizeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10, 2),
    league: DataTypes.BOOLEAN,
    cup: DataTypes.BOOLEAN
  }, {
    tableName: 'prizes',
    freezeTableName: true,
    timestamps: false
  })

  return Prize
}
