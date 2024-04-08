const db = require('../data')
const { getGameWeek } = require('../helpers')

const adhocTransaction = async (transaction) => {
  const weeks = await db.Week.findAll()
  const adHocTypeId = await db.TransactionType.findOne({
    where: {
      type: 'Ad-Hoc'
    }
  })
  
  const gameWeek = await getGameWeek(weeks, new Date())
  
  return db.Transaction.create({
    value: transaction.amountPaid,
    managerId: transaction.managerSelect,
    notes: transaction.notes,
    date: new Date(),
    transactionTypeId: adHocTypeId.transactionTypeId,
    weekId: gameWeek.dataValues.weekId,
  })
}

module.exports = {
  adhocTransaction
}

