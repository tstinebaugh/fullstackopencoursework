const testingRouter = require('express').Router()
import { deleteMany as deleteNotes } from '../models/note'
import { deleteMany as deleteUsers } from '../models/user'

testingRouter.post('/reset', async (_request, response) => {
  await deleteNotes({})
  await deleteUsers({})

  response.status(204).end()
})

export default testingRouter