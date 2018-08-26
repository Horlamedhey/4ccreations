var mongoose = require('mongoose')
var Schema = mongoose.Schema
var LocationSchema = new Schema({
  CountryName: String,
  States: [
    {
      Cities: [],
      StateName: String
    }
  ]
})
var Location = mongoose.model('Location', LocationSchema)
module.exports = Location
