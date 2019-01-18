const mongoose = require('mongoose')

const api = {}

api.save = (User, Board, List, Card, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) return res.status(400).json(error)
      if (user) {
        Board.findOne({ _id: req.query.board_id }, (error, board) => {
          if (error) return res.status(400).json(error)
          if (board) {
            List.findOne({ _id: req.query.list_id }, (error, list) => {
              if (error) return res.status(400).json(error)
              if (list) {
                Card.count({ list_id: req.query.list_id }, (error, count) => {
                  if (error) return res.status(400).json(error)
                  const card = new Card({
                    pos: ++count,
                    list_id: req.query.list_id,
                    board_id: req.query.board_id,
                    user_id: req.query.user_id,
                    name: req.body.name
                  })
                  card.save((error, card) => {
                    if (error) return res.status(400).json(error)
                    return res.status(200).json({ success: true, message: 'Card creation', card: card })
                  })
                })
              } else return res.status(400).json({ success: false, message: 'Invalid list' })
            })
          } else return res.status(400).json({ success: false, message: 'Invalid board' })
        })
      } else return res.status(400).json({ success: false, message: 'Invalid client' })
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' })
}

api.remove = (User, Card, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) return res.status(400).json(error)
      if (user) {
        Card.findOneAndRemove({ _id: req.query.card_id }, (error, removed) => {
          if (error) return res.status(400).json(error)
          if (removed) {
            return res.status(200).json({ success: true, message: 'Removed successfully' })
          }
        })
      } else return res.status(400).json({ success: false, message: 'Invalid client' })
    })
  } else return res.status(401).send({ success: false, message: 'Unauthorized' })
}

api.update = (User, Board, List, Card, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) return res.status(400).json(error)
      if (user) {
        Board.findOne({ _id: req.query.board_id }, (error, board) => {
          if (error) return res.status(400).json(error)
          if (board) {
            List.findOne({ _id: req.query.list_id }, (error, list) => {
              if (error) return res.status(400).json(error)
              if (list) {
                let data = req.body.data
                for (let i = 0; i < data.length; i++) {
                  const el = data[i]
                  Card.findByIdAndUpdate(el.id, el.data, { new: true }, (error, card) => {
                    if (error) return res.status(400).json(error)
                  })
                }
                return res.status(200).json({ success: true, message: 'Update successfully' })
              } else return res.status(400).json({ success: false, message: 'Invalid list' })
            })
          } else return res.status(400).json({ success: false, message: 'Invalid board' })
        })
      } else return res.status(400).json({ success: false, message: 'Invalid client' })
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' })
}

module.exports = api
