const db = require('../data')
const { getMonths } = require('../helpers')

const getWinnings = async () => {
  const managers = await db.Manager.findAll({ order: ['name'] })
  const weeks = await db.Week.findAll()
  const months = await getMonths(weeks)

  const transactions = await db.Transaction.findAll({
    include: [{
      model: db.Manager,
      as: 'manager',
      attributes: ['name']
    },
    {
      model: db.TransactionType,
      as: 'transactionType'
    }]
  })

  const fiverTransactions = transactions.filter(transaction => transaction.transactionType.dataValues.type === 'Fiver')
  const weeklyTransactions = transactions.filter(transaction => transaction.transactionType.dataValues.type === 'Weekly')
  const jackpotTransactions = transactions.filter(transaction => transaction.transactionType.dataValues.type === 'Jackpot')
  const leagueCupTransactions = transactions.filter(transaction => transaction.transactionType.dataValues.type === 'League or Cup')
  const fiversByMonth = getFiversByMonth(months, managers, fiverTransactions)
  const fiversByManager = getFiversByManager(fiverTransactions)
  const weeklyWinners = getWinners(weeks, weeklyTransactions)
  const jackpotWinners = getWinners(weeks, jackpotTransactions)
  const leagueCupWinners = getleagueCupWinners(leagueCupTransactions)

  const winnings = {
    fiversByMonth,
    fiversByManager,
    weeklyWinners,
    jackpotWinners,
    leagueCupWinners
  }

  return winnings
}

function getFiversByMonth(months, manager, transactions) {
  // Initialize an array to hold the data with month indices
  let fiversByMonthIndexed = []

  for (const month of months) {
    // Find or create the month object within the array
    let monthObj = fiversByMonthIndexed.find(m => m.monthName === month.monthName)
    if (!monthObj) {
      monthObj = { index: month.index, monthName: month.monthName, names: [] }
      fiversByMonthIndexed.push(monthObj)
    }

    for (const transaction of transactions) {
      const transactionDate = new Date(transaction.dataValues.date)
      const transactionMonth = transactionDate.toLocaleString('en-GB', { month: 'long' })

      if (transactionMonth === month.monthName) {
        if (!monthObj.names.includes(transaction.manager.name)) {
          monthObj.names.push(transaction.manager.name)
        }
      }
    }
  }

  fiversByMonthIndexed.sort((a, b) => a.index - b.index)

  return fiversByMonthIndexed
}

function getFiversByManager(transactions) {
  // Initialize an array to hold the data with month indices
  let managerCounts = {}

  // Count the transactions for each manager
  for (const transaction of transactions) {
    const managerName = transaction.manager.name
    if (!managerCounts[managerName]) {
      managerCounts[managerName] = 5 // Initialize count to 1 for new manager
    } else {
      managerCounts[managerName]+= 5 // Increment count for existing manager
    }
  }

  // Convert managerCounts object to an array of objects
  let fiversByManagerIndexed = []
  for (const [managerName, count] of Object.entries(managerCounts)) {
    fiversByManagerIndexed.push({ managerName, count })
  }

  return fiversByManagerIndexed
}

function getWinners(weeks, transactions) {
  let transactionsByWeek = []

  for (const week of weeks) {
    const weekTransactions = transactions.filter(transaction => transaction.weekId === week.weekId)
    const managerNames = weekTransactions.map(transaction => transaction.manager.name)
    transactionsByWeek.push({ weekId: week.weekId, managerNames })
  }

  return transactionsByWeek
}

function getleagueCupWinners(transactions) {
  let managerCounts = {}

  // Count the transactions for each manager
  for (const transaction of transactions) {
    const managerName = transaction.manager.name
    if (!managerCounts[managerName]) {
      managerCounts[managerName] = 0 // Initialize count to 1 for new manager
    } else {
      managerCounts[managerName]+= transaction.value // Increment count for existing manager
    }
  }

  // Convert managerCounts object to an array of objects
  let leagueCupByManagerIndexed = []
  for (const [managerName, count] of Object.entries(managerCounts)) {
    leagueCupByManagerIndexed.push({ managerName, count })
  }

  return leagueCupByManagerIndexed
}

module.exports = {
  getWinnings
}
