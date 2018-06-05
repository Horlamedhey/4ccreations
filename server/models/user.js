var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  title: [String],
  name: String,
  username: {
    type: String,
    max: 10,
    unique: true,
    index: true
  },
  phone: String,
  email: {
    index: true,
    type: String,
    unique: true,
    lowercase: true
  },
  status: String,
  password: {
    type: String
  },
  nationality: String,
  state: String,
  city: String,
  newsletter: Boolean,
  createdOn: {type: String, index: true}
})

UserSchema.pre('save', function (next) {
  let user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

var User = mongoose.model('User', UserSchema)
module.exports = User
