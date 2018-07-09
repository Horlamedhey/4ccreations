import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'
import session from './session/session'

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const mongodb = require('./mongodb')

app.use(helmet())
app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb'}))
// connecting to database
mongodb.connect()
app.use(session)
// Import API Routes
app.use('/', userRoutes)
app.use('/', postRoutes)
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
