const db = require('../data')

const getSeasonData = async () => {


  let startWeek
  const weeks = await db.Week.findAll()
  if (weeks.length) {
  startWeek = weeks.find(week => week.weekId === 1)
  }
  
  const managerCount = await db.Manager.count({
    where: {
      active: true
    }
  })

  const seasonDataModel = {
    weeks: weeks,
    start: weeks.length ? startWeek.start : '',
    managers: managerCount
  }

  return seasonDataModel
}

module.exports = {
  getSeasonData
}
