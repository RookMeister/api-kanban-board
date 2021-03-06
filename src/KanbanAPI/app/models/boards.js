const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  favourites: {
    type: Boolean,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pos: {
    type: Number,
    required: true
  }
})

mongoose.model('Board', Schema)
