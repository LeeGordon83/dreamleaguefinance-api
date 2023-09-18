module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define('Week', {
    weekId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    complete: DataTypes.BOOLEAN
  }, {
    tableName: 'weeks',
    freezeTableName: true,
    timestamps: false
  })

  Week.associate = function (models) {
    Week.hasMany(models.Transaction, {
      foreignKey: 'weekId',
      as: 'weeks',
      onDelete: 'CASCADE'
    })
  }
  return Week
}
