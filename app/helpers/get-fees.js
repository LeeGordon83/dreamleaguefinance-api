const getFees = async (fees, managers, feeType, weeks) => {
  let totalFee = 0
  for (const type of feeType) {
  const fee = Number(fees.find(x => x.type === type)?.amount) || null
  if (type === 'Weekly') {
  totalFee = fee * managers * weeks
  } else {
  totalFee += fee * managers
  }
}

  return totalFee
}

module.exports = {
  getFees
}
