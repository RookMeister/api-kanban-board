const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  list_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  pos: {
    type: Number,
    required: true
  }
})

mongoose.model('Card', Schema)
