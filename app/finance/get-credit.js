const db = require('../data')
const { getMonths } = require('../helpers')

const getCredit = async () => {
  const weeks = await db.Week.findAll()
  const months = await getMonths(weeks)
  const fees = await db.Fee.findAll()
  const managers = await db.Manager.findAll()
  const transactions = await db.Transaction.findAll({
    include: [
      {
        model: db.TransactionType,
        as: 'transactionType'
      }]
  })

  const moneyOwed = groupMoneyOwedByMonth(weeks, months, fees)
  const allManagersCreditByMonth = []

  managers.forEach(manager => {
    const managerTransactions = transactions.filter(transaction => transaction.managerId === manager.managerId && transaction.transactionType.type !== 'League or Cup')
    const managerCreditByMonth = managerCreditCalculator(manager, managerTransactions, moneyOwed, months)
    allManagersCreditByMonth.push(managerCreditByMonth)
  })

  const credit = {
    owed: moneyOwed,
    managerCreditByMonth: allManagersCreditByMonth,
    months
  }

  return credit
}

module.exports = {
  getCredit
}

function groupMoneyOwedByMonth (weeks, months, fees) {
  const owedByMonthName = {}

  const weeklyFee = fees.filter(fee => fee.type === 'Weekly').map(fee => fee.amount)
  const joiningFee = fees.filter(fee => fee.type === 'Joining Fee').map(fee => fee.amount)
  const cupFee = fees.filter(fee => fee.type === 'Cup Entry').map(fee => fee.amount)
  const leagueCupFee = fees.filter(fee => fee.type === 'League Cup Entry').map(fee => fee.amount)

  for (const week of weeks) {
    const monthName = week.start.toLocaleString('en-GB', { month: 'long' })

    // If the month name doesn't exist in the object, create an empty array for it
    if (!owedByMonthName[monthName]) {
      owedByMonthName[monthName] = { monthName, owedSubtotal: 0 }
    }

    owedByMonthName[monthName].owedSubtotal += Number(weeklyFee)
  }

  owedByMonthName.August.owedSubtotal += Number(joiningFee)
  owedByMonthName.September.owedSubtotal += Number(cupFee)
  owedByMonthName.January.owedSubtotal += Number(leagueCupFee)

  let totalOwed = 0

  for (const index in months) {
    const month = months[index].monthName
    totalOwed += owedByMonthName[month].owedSubtotal
  }

  // Convert the object into an array of month name objects
  const groupedOwed = Object.values(owedByMonthName)

  const owed = {
    groupedOwed,
    totalOwed
  }

  return owed
}

function managerCreditCalculator (manager, transactions, owedByMonth, months) {
  let totalCredit = transactions.reduce((total, transaction) => total + Number(transaction.value), 0)

  const managerCreditByMonth = {}

  for (const index in months) {
    const monthName = months[index].monthName

    // If the month name doesn't exist in the object, create an empty array for it

    if (!managerCreditByMonth[monthName]) {
      managerCreditByMonth[monthName] = { monthName, monthCredit: 0 }
    }

    totalCredit = (totalCredit - owedByMonth.groupedOwed[index].owedSubtotal).toFixed(2)

    managerCreditByMonth[monthName].monthCredit = totalCredit
  }

  const groupedManagerCreditByMonth = Object.values(managerCreditByMonth)

  const managerCredit = {
    manager,
    managerCreditByMonth: groupedManagerCreditByMonth
  }

  return managerCredit
}
