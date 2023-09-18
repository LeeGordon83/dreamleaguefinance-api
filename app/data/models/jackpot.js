module.exports = (sequelize, DataTypes) => {
  const Jackpot = sequelize.define('Jackpot', {
    jackpotId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    start: DataTypes.INTEGER,
    end: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    tableName: 'jackpots',
    freezeTableName: true,
    timestamps: false
  })

  return Jackpot
}
