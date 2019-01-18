const mongoose = require('mongoose')
const UserModel = require('@KanbanModels/users')
const BoardModel = require('@KanbanModels/boards')
const ListModel = require('@KanbanModels/lists')
const CardModel = require('@KanbanModels/cards')

const models = {
  User: mongoose.model('User'),
  Board: mongoose.model('Board'),
  List: mongoose.model('List'),
  Card: mongoose.model('Card')
}

module.exports = models
