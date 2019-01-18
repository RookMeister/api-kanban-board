const mongoose = require('mongoose')

const api = {}

api.save = (User, Board, List, Token) => (req, res) => {
  if (Token) {
    User.findById(req.query.user_id, (error, user) => {
      if (error) res.status(400).json(error)
      if (user) {
        Board.findById(req.query.board_id, (error, board) => {
          if (error) res.status(400).json(error)
          if (board) {
            List.count({ board_id: req.query.board_id }, (error, count) => {
              if (error) res.status(400).json(error)
              const list = new List({
                pos: ++count,
                board_id: req.query.board_id,
                user_id: req.query.user_id,
                name: req.body.name
              })
              list.save((error, list) => {
                if (error) return res.status(400).json(error)
                if (list) return res.status(200).json({ success: true, message: 'List creation', list: list })
              })
            })
          } else return res.status(400).json({ success: false, message: 'Invalid board' })
        })
      } else return res.status(400).json({ success: false, message: 'Invalid client' })
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' })
}

api.remove = (User, List, Card, Token) => (req, res) => {
  if (Token) {
    User.findById(req.query.user_id, (error, user) => {
      if (error) return res.status(400).json(error)
      if (user) {
        Card.remove({ list_id: req.query.list_id }, (error, removed) => {
          if (error) return res.status(400).json(error)
          if (removed) {
            List.findByIdAndRemove(req.query.list_id, (error, removed) => {
              if (error) return res.status(400).json(error)
              if (removed) return res.status(200).json({ success: true, message: 'Removed successfully' })
            })
          }
        })
      } else return res.status(400).json({ success: false, message: 'Invalid client' })
    })
  } else return res.status(401).send({ success: false, message: 'Unauthorized' })
}

api.update = (User, Board, List, Token) => (req, res) => {
  if (Token) {
    User.findById(req.query.user_id, (error, user) => {
      if (error) res.status(400).json(error)
      if (user) {
        Board.findById(req.query.board_id, (error, board) => {
          if (error) res.status(400).json(error)
          if (board) {
            let data = req.body.data
            for (let i = 0; i < data.length; i++) {
              const el = data[i]
              List.findByIdAndUpdate(el.id, el.data, { new: true }, (error, list) => {
                if (error) return res.status(400).json(error)
              })
            }
            return res.status(200).json({ success: true, message: 'Update successfully' })
          } else return res.status(400).json({ success: false, message: 'Invalid board' })
        })
      } else return res.status(400).json({ success: false, message: 'Invalid client' })
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' })
}

module.exports = api
