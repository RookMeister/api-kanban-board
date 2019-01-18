const mongoose = require('mongoose')

const api = {}

api.getAll = (Board, List, Card, Token) => async (req, res) => {
  if (Token) {
    let board = await Board.findById(req.query.board_id, (error, board) => {
      if (error) return res.status(400).json(error)
      return board
    })
    let list = await List.find(
      { user_id: req.query.user_id, board_id: req.query.board_id },
      (error, list) => {
        if (error) return res.status(400).json(error)
        return list
      }
    )
    let card = await Card.find(
      { user_id: req.query.user_id, board_id: req.query.board_id },
      (error, card) => {
        if (error) return res.status(400).json(error)
        return card
      }
    )
    let result = list.map(itemlist => {
      let itemL = itemlist.toObject()
      let res = card.filter(itemcard => {
        let itemC = itemcard.toObject()
        if (itemC.list_id.toString() === itemL._id.toString()) {
          return itemC
        }
      })
      res.sort((a, b) => {
        if (a.pos > b.pos) return 1
        else return -1
      })
      itemL.cards = res
      return itemL
    })
    result.sort((a, b) => {
      if (a.pos > b.pos) return 1
      if (a.pos < b.pos) return -1
    })
    let data = Object.assign(board.toObject(), { result: result })
    return res.status(200).json(data)
  } else return res.status(403).send({ success: false, message: 'Unauthorized' })
}

module.exports = api
