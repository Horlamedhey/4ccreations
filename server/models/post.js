var mongoose = require('mongoose')
var timestamps = require('mongoose-timestamp')
var Schema = mongoose.Schema

var PostSchema = new Schema({
  title: String,
  description: String,
  img: [],
  comments: [],
  likes: [],
  category: [],
  uploader: String,
  uploaderImg: String,
  time: String
})
PostSchema.plugin(timestamps)
var Post = mongoose.model('Post', PostSchema)
module.exports = Post
