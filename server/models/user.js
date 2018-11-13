var mongoose = require('mongoose')
var timestamps = require('mongoose-timestamp')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  personalInfo: {
    title: [String],
    name: String,
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    phone: String,
    email: {
      type: String,
      required: true,
      trim: true
    },
    status: String,
    password: {
      type: String,
      required: true
    },
    picture: { type: String, default: 'http://byronbayphotographer.com/wp-content/uploads/2017/11/pleasing-mystery-clipart-person-pencil-and-in-color.jpg' },
    nationality: String,
    state: String,
    city: String,
    dob: { type: String, default: '' },
    gender: { type: String, default: '' },
    company: { type: String, default: '' },
    institution: { type: String, default: '' },
    level: { type: String, default: '' },
    position: { type: String, default: '' },
    newsletter: Boolean
  },
  portfolio: [],
  dashboard: {},
  settings: {}
})
UserSchema.plugin(timestamps)
UserSchema.pre('save', function (next) {
  let user = this
  bcrypt.hash(user.personalInfo.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.personalInfo.password = hash
    next()
  })
})
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.personalInfo.password)
}
var User = mongoose.model('User', UserSchema)
module.exports = User
