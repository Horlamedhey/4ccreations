import express from 'express'
import path from 'path'
import { Nuxt, Builder } from 'nuxt'
import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'
import session from './session/session'
import cookieParser from 'cookie-parser'
var http = require('http')
var https = require('https')

http.globalAgent.maxSockets = 10000

https.globalAgent.maxSockets = 10000
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const mongodb = require('./mongodb')

app.use(helmet())
app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
// app.use(multer().array())
app.use(cookieParser())
// connecting to database
mongodb.connect()
app.use(session)
// Import API Routes
app.use('/', userRoutes)
app.use('/', postRoutes)
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
app.use(express.static(path.join(__dirname, '../assets')))
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
let server = app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

const io = require('socket.io').listen(server)

// io.on('connection', socket => {
//   // display the id of the connected client on the console
//   console.log('id:' + socket.id + ' is connected')
//   // Send the message held on the server side to the client side
//   socket.emit('new-message', 'hello socket')
// })
export default io
