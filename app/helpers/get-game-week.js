
  const getGameWeek = (weeks, date) => {
    for (const week of weeks) {
      if (date >= week.start && date <= week.end) {
        return week
      }
    }
    return weeks[weeks.length - 1]
  }

  module.exports = {
    getGameWeek
  }
