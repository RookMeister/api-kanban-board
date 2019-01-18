const passport = require('passport')
const config = require('@config')
const models = require('@Kanban/app/setup')

module.exports = app => {
  const api = app.KanbanAPI.app.api.getListsOfCards

  app
    .route('/api/getAll')
    .get(passport.authenticate('jwt', config.session), api.getAll(models.Board, models.List, models.Card, app.get('kanbansecret')))
}
