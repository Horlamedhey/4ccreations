var mongoose = require('mongoose')
var Schema = mongoose.Schema
var NewsletterSchema = new Schema({
  emails: [{type: String, unique: true}]
})
var Newsletter = mongoose.model('Newsletter', NewsletterSchema)
module.exports = Newsletter
