const db = require('../data')
const { getMonths } = require('../helpers')

const getAllTransactions = async () => {
  const managers = await db.Manager.findAll({ order: ['name'] })
  
  const transactions = await db.Transaction.findAll({
    include: [ {
      model: db.Manager,
      as: 'manager', // Specify the alias 'manager' you defined in the association
      attributes: ['name'], // Include the 'name' field
    },
    { model: db.TransactionType,
    as: 'transactionType'}]
  })

  const weeks = await db.Week.findAll()

  let months

  if (weeks.length) {
    months = await getMonths(weeks)
    }

  const transactionModel = {
    managers: managers,
    transactions: transactions,
    months: months
  }
  return transactionModel
}

module.exports = {
  getAllTransactions
}
