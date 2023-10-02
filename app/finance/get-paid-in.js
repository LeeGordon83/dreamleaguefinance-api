const db = require('../data')
const { getMonths } = require('../helpers')

const getPaidIn = async () => {
  const weeks = await db.Week.findAll()
  const managers = await db.Manager.findAll()
  const transactions = await db.Transaction.findAll({
    include: [ 
    { model: db.TransactionType,
    as: 'transactionType'}]
  })
  let months
  
  if (weeks.length) {
    months = await getMonths(weeks)
  }

  let paidInModel = {
    months: months,
    managers: managers,
    managersPaidIn: []
  }

  managers.forEach(manager => { 
    const managerTransactions = transactions.filter(transaction => transaction.managerId === manager.managerId)
    let sortedTransactions = groupTransactionsByMonthNames(managerTransactions, manager.name)
    paidInModel.managersPaidIn.push(sortedTransactions)
  }) 

  return paidInModel
}

function groupTransactionsByMonthNames(transactions, managerName) {
  // Create an object to store transactions grouped by month names
  const transactionsByMonthName = {}

  // Loop through each transaction
  for (const transaction of transactions) {
    const transactionDate = new Date(transaction.date)
    // Get the month name
    const monthName = transactionDate.toLocaleString('en-GB', { month: 'long' })

    // If the month name doesn't exist in the object, create an empty array for it
    if (!transactionsByMonthName[monthName]) {
      transactionsByMonthName[monthName] = { monthName, transactions: [], paidInSubtotal: 0, wonSubtotal: 0 }
    }

    // Add the transaction to the corresponding month name array
    transactionsByMonthName[monthName].transactions.push(transaction)

    // Update the subtotals for the month
    if(transaction.transactionType.type === "Ad-Hoc")
    {
    transactionsByMonthName[monthName].paidInSubtotal += Number(transaction.value)
    }
    else if(transaction.transactionType.type === "Fiver" || transaction.transactionType.type === "Weekly")
    {
      transactionsByMonthName[monthName].wonSubtotal += Number(transaction.value)
    }
  }

  // Convert the object into an array of month name objects
  const groupedTransactions = Object.values(transactionsByMonthName)

  const managerTransactions = {
    managerName: managerName,
    groupedTransactions: groupedTransactions
  }

  return managerTransactions
}




module.exports = {
  getPaidIn
}
