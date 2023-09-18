module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    historyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    year: DataTypes.STRING,
    mostWon: DataTypes.STRING,
    mostFivers: DataTypes.STRING,
    leastFivers: DataTypes.STRING,
    mostWeekly: DataTypes.STRING,
    leastWeekly: DataTypes.STRING,
    biggestJackpot: DataTypes.STRING,
    managers: DataTypes.INTEGER
  }, {
    tableName: 'histories',
    freezeTableName: true,
    timestamps: false
  })

  return History
}
