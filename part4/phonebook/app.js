import config from './utils/config'
import express, { json } from 'express'
const app = express()
import cors from 'cors'
import notesRouter from './controllers/notes'
import middleware from './utils/middleware'
import { info, error as _error } from './utils/logger'
import { connect } from 'mongoose'

info('connecting to', config.MONGODB_URI)

connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    _error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app