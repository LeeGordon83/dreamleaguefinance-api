const db = require('../data')
const { getPrizes } = require('../admin')

const getBalance = async () => {
  const prizes = await getPrizes()
  const fees = await db.Fee.findAll()
  const managers = await db.Manager.count()
  const weeks = await db.Week.count()
  const transactions = await db.Transaction.findAll({
    include: [
      {
        model: db.TransactionType,
        as: 'transactionType'
      }]
  })

  const balance = {
    weeklyFees: feeCalculator(fees, managers, ['Weekly'], weeks),
    joiningFees: feeCalculator(fees, managers, ['Joining Fee']),
    cupFees: feeCalculator(fees, managers, ['Cup Entry']),
    leagueCupFees: feeCalculator(fees, managers, ['League Cup Entry']),
    fiverExpected: getPrizeAmount(prizes, 'Fiver') * 5 * 9,
    fiverOut: transactionCalculator(transactions, ['Fiver']),
    jackpotExpected: weeks * 2,
    jackpotOut: transactionCalculator(transactions, ['Jackpot']),
    weeklyPrizeExpected: getPrizeAmount(prizes, 'Weekly Prize') * weeks,
    weeklyPrizeOut: transactionCalculator(transactions, ['Weekly']),
    leagueCupExpected: getPrizeAmount(prizes, 'League or Cup'),
    leagueCupOut: transactionCalculator(transactions, ['League or Cup']),
    expectedTotalIn: feeCalculator(fees, managers, ['Weekly','League Cup Entry', 'Joining Fee', 'Cup Entry'], weeks),
    currentTotalIn: transactionCalculator(transactions, ['Ad-Hoc']),
    expectedTotalOut: getPrizeAmount(prizes, 'All'),
    currentTotalOut: transactionCalculator(transactions, ['League or Cup', 'Fiver', 'Weekly', 'Jackpot'])
  }

  return balance
}

function feeCalculator (fees, managers, feeType, weeks) {
  
  let totalFee = 0
  for (const type of feeType) {
  const fee = Number(fees.find(x => x.type === type)?.amount) || null
  if (feeType === 'Weekly') {
  totalFee += fee * managers * weeks
  } else {
  totalFee += fee * managers
  }
}

  return totalFee
}


function getPrizeAmount (prizes, prizeType) {
  if (prizeType === 'League or Cup') {
    const total = prizes.reduce((acc, prize) => {
      if (prize.league || prize.cup) {
        return acc + Number(prize.amount)
      }
      return acc
    }, 0)
    return total || null
  } else if (prizeType === 'All') {
    return Number(prizes.reduce((total, prize) => total + prize.amount, 0))
  } else {
    return Number(prizes.find(x => x.type === prizeType)?.amount) || null
  }
}

function transactionCalculator (transactions, transactionTypes) {
  let total = 0

  for (const type of transactionTypes) {
    total += transactions
      .filter(x => x.transactionType.type === type)
      .reduce((sum, transaction) => sum + transaction.value, 0)
  }

  return Number(total)
}

module.exports = {
  getBalance
}
