const { start: startServer } = require('./server')

module.exports = (async () => {
  await startServer()
})()
