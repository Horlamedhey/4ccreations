import session from 'express-session'
var mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
var confi = require('../conf')

export default session({
  name: 'user',
  secret: confi.secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 60 * 60 * 4 })
})
