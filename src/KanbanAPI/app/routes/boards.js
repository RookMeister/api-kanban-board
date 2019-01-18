const passport = require('passport')
const config = require('@config')
const models = require('@Kanban/app/setup')

module.exports = app => {
  const api = app.KanbanAPI.app.api.boards

  app
    .route('/api/board')
    .get(passport.authenticate('jwt', config.session), api.getAll(models.Board, app.get('kanbansecret')))
    .post(passport.authenticate('jwt', config.session), api.save(models.User, models.Board, app.get('kanbansecret')))
    .delete(
      passport.authenticate('jwt', config.session),
      api.remove(models.User, models.Board, models.List, models.Card, app.get('kanbansecret'))
    )
    .put(passport.authenticate('jwt', config.session), api.update(models.User, models.Board, app.get('kanbansecret')))
}
