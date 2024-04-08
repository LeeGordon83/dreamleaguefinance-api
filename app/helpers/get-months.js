const getMonths = async (weeks) => {
  const months = await getMonthsBetweenDates(weeks[0].start, weeks[weeks.length - 1].end)

  return months
}

function getMonthsBetweenDates (startDate, endDate) {
  const months = []
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const monthNumber = currentDate.getMonth() + 1
    const monthName = currentDate.toLocaleString('en-GB', { month: 'long' })
    months.push({ monthNumber, monthName })

    // Move to the next month
    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
  }
  return months
}

module.exports = {
  getMonths
}
