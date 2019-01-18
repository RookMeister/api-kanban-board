const passport = require('passport')
const config = require('@config')
const models = require('@Kanban/app/setup')

module.exports = app => {
  const api = app.KanbanAPI.app.api.lists

  app
    .route('/api/list')
    .post(passport.authenticate('jwt', config.session), api.save(models.User, models.Board, models.List, app.get('kanbansecret')))
    .delete(
      passport.authenticate('jwt', config.session),
      api.remove(models.User, models.List, models.Card, app.get('kanbansecret'))
    )
    .put(passport.authenticate('jwt', config.session), api.update(models.User, models.Board, models.List, app.get('kanbansecret')))
}
