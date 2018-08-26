var mongoose = require('mongoose')
var Schema = mongoose.Schema
var PlaceSchema = new Schema({
  Places: [
    {
      States: [
        {
          Cities: [],
          StateName: String
        }
      ],
      CountryName: String,
      id: Number
    }
  ]
})
var Place = mongoose.model('Place', PlaceSchema)
module.exports = Place
