const db = require('../data')
const { getFees } = require('../helpers')

const getIndividualWinnings = async () => {
  const managers = await db.Manager.findAll({ order: ['name'] })
  const managerCount = managers.length
  const fees = await db.Fee.findAll()
  const weeks = await db.Week.count()
  const totalFees = await getFees(fees, managerCount, ['Weekly','League Cup Entry', 'Joining Fee', 'Cup Entry'], weeks)

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



  let allManagerTransactionTotals = []
  
  managers.forEach(manager => {
    const managerTransactions = transactions.filter(transaction => transaction.managerId === manager.managerId)
    const managerTransactionsTotal = getManagerTransactionTotals(manager, managerTransactions)
    managerTransactionsTotal.payout = managerTransactionsTotal.total + managerTransactionsTotal.adhoc - totalFees
    allManagerTransactionTotals.push(managerTransactionsTotal)
  })

  return allManagerTransactionTotals
}

function getManagerTransactionTotals(manager, managerTransactions) {

let groupedTotalTransactions = {
  manager : manager.name,
  fivers : 0,
  weekly : 0,
  jackpot : 0,
  leaguecup : 0,
  total : 0,
  payout : 0,
  adhoc : 0
}

managerTransactions.forEach(transaction => {
  switch (transaction.transactionType.dataValues.type) {
    case 'Fiver':
      groupedTotalTransactions.fivers += Number(transaction.value)
      groupedTotalTransactions.total += Number(transaction.value)
      break
    case 'Weekly':
      groupedTotalTransactions.weekly += Number(transaction.value)
      groupedTotalTransactions.total += Number(transaction.value)
      break
    case 'Jackpot':
      groupedTotalTransactions.jackpot += Number(transaction.value)
      groupedTotalTransactions.total += Number(transaction.value)
      break
    case 'League or Cup':
      groupedTotalTransactions.leaguecup += Number(transaction.value)
      groupedTotalTransactions.total += Number(transaction.value)
      break
    default:
      groupedTotalTransactions.adhoc += Number(transaction.value)
      break
  }
})

  return groupedTotalTransactions
}

module.exports = {
  getIndividualWinnings
}
