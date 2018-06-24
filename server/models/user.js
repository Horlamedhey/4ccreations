var mongoose = require('mongoose')
var timestamps = require('mongoose-timestamp')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  personalInfo: {
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
    dob: String,
    gender: String,
    company: String,
    institution: String,
    level: String,
    position: String,
    newsletter: Boolean
  },
  portfolio: [{}],
  dashboard: {},
  settings: {}
})
UserSchema.plugin(timestamps)
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.personalInfo.password)
}
var User = mongoose.model('User', UserSchema)
module.exports = User
