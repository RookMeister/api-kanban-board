const db = require('../configDB.js')

module.exports = {
  secret: 'kanbansecret',
  session: { session: false },
  database: `mongodb://${db.username}:${db.password}${db.database}`
}
