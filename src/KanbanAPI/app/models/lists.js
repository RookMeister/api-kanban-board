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
  pos: {
    type: Number,
    required: true
  }
})

mongoose.model('List', Schema)
