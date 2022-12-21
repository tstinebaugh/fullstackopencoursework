import app from './app' // varsinainen Express-sovellus
import { createServer } from 'http'
import { PORT } from './utils/config'
import { info } from './utils/logger'

const server = createServer(app)

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})