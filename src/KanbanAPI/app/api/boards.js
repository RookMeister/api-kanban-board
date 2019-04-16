const mongoose = require('mongoose')

const api = {}

api.getAll = (Board, Token) => (req, res) => {
  if (Token) {
    Board.find({ user_id: req.query.user_id }, (error, boards) => {
      if (error) return res.status(400).json(error)
      return res.status(200).json(boards)
    })
  } else {
    return res.status(403).send({ success: false, message: 'Unauthorized' })
  }
}

api.save = (User, Board, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) return res.status(400).json(error)
      if (user) {
        Board.count({ user_id: req.query.user_id}, (error, count) => {
          if (error) return res.status(400).json(error)
          const board = new Board({
            user_id: req.query.user_id,
            name: req.body.name,
            favourites: false,
            pos: count,
            background: '1'
          })
          board.save(error => {
            if (error) return res.status(400).json(error)
            return res.status(200).json({ success: true, message: 'Board creation' })
          })
        })
      } else return res.status(400).json({ success: false, message: 'Invalid board' })
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' })
}

api.remove = (User, Board, List, Card, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) return res.status(400).json(error)
      if (user) {
        Card.remove({ board_id: req.query.board_id }, (error, removed) => {
          if (error) return res.status(400).json(error)
          if (removed) {
            List.remove({ board_id: req.query.board_id }, (error, removed) => {
              if (error) return res.status(400).json(error)
              if (removed) {
                Board.remove({ _id: req.query.board_id }, (error, removed) => {
                  if (error) return res.status(400).json(error)
                  if (removed)
                    return res
                      .status(200)
                      .json({ success: true, message: 'Removed successfully' })
                })
              }
            })
          }
        })
      } else return res.status(400).json({ success: false, message: 'Invalid client' })
    })
  } else return res.status(401).send({ success: false, message: 'Unauthorized' })
}

api.update = (User, Board, Token) => (req, res) => {
  if (Token) {
    User.findById(req.query.user_id, (error, user) => {
      if (error) res.status(400).json(error)
      if (user) {
        Board.findByIdAndUpdate(req.body._id, req.body, { new: true }, (error, board) => {
          if (error) return res.status(400).json(error)
        })
        return res.status(200).json({ success: true, message: 'Update successfully' })
      } else return res.status(400).json({ success: false, message: 'Invalid client' })
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' })
}

module.exports = api
