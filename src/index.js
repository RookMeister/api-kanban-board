require('module-alias/register')

const http = require('http')
const KanbanAPI = require('@KanbanAPI')
const KanbanServer = http.Server(KanbanAPI)
const KanbanPORT = process.env.PORT || 3001
const LOCAL = '0.0.0.0'

KanbanServer.listen(KanbanPORT, LOCAL, () =>
  console.log(`KanbanAPI running on ${KanbanPORT}`)
)
