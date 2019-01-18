module.exports = (mongoose, config) => {
  const database = mongoose.connection
  mongoose.Promise = Promise

  mongoose.connect(
    config.database,
    {
      useMongoClient: true,
      promiseLibrary: global.Promise
    }
  )

  database.on('error', error => console.log(`Connection to Kanban database failed: ${error}`))
  database.on('connected', () => console.log('Connected to Kanban database'))
  database.on('disconnected', () => console.log('Disconnected from Kanban database'))

  process.on('SIGINT', () => {
    database.close(() => {
      console.log('Kanban terminated, connection closed')
      process.exit(0)
    })
  })
}
