const models = require('@Kanban/app/setup')
const passport = require('passport')
const config = require('@config')

module.exports = app => {
  const api = app.KanbanAPI.app.api.users

  app.route('/api/signup').post(api.signup(models.User))

  app.route('/api/users').get(passport.authenticate('jwt', config.session), api.index(models.User, app.get('kanbansecret')))
}
