import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import user from './routes/userRoutes'

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
// app.use(user.users)
const mongodb = require('./mongodb')

mongodb.connect()

// Import API Routes
app.use('/api', user.users)

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
