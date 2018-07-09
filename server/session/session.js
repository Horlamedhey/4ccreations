import session from 'express-session'
var confi = require('../conf')

export default session({
  name: 'user',
  secret: confi.secret,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 14400000 }
})
