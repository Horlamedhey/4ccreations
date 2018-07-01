import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import routes from './routes/userRoutes'

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const mongodb = require('./mongodb')

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
// connecting to database
mongodb.connect()
// checking for login with token
// app.use(function (req, res, next) {
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//     jwt.verify(req.headers.authorization.split(' ')[1], 'SECRET', function (err, decode) {
//       if (err) {
//         req.user = undefined
//       } req.user = decode
//       next()
//     })
//   } else {
//     req.user = undefined
//     next()
//   }
// })
// Import API Routes
app.use('/', routes)
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
