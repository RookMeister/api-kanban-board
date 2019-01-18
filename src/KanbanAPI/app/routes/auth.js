const models = require('@Kanban/app/setup')
const passport = require('passport')
const config = require('@config')

module.exports = app => {
  const api = app.KanbanAPI.app.api.auth

  app.route('/').get((req, res) => res.send('Kanban API'))

  app.route('/api/auth').post(api.login(models.User))
}
