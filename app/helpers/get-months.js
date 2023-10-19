const getMonths = async (weeks) => {
  const months = await getMonthsBetweenDates(weeks[0].start, weeks[weeks.length - 1].end)

  return months
}

function getMonthsBetweenDates (startDate, endDate) {
  const months = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const monthName = currentDate.toLocaleString('en-GB', { month: 'long' })
    months.push(monthName)

    // Move to the next month
    currentDate.setMonth(currentDate.getMonth() + 1)
  }
  return months
}

module.exports = {
  getMonths
}
