var mongoose = require('mongoose')
var timestamps = require('mongoose-timestamp')
var Schema = mongoose.Schema

var PostSchema = new Schema({
  title: String,
  description: String,
  img: [],
  comments: [{
    comment: String,
    commentor: String,
    commentorImg: String,
    time: String
  }],
  likes: [{
    mode: String,
    liker: String,
    likerImg: String
  }],
  category: [],
  uploader: String,
  uploaderImg: String,
  views: {
    type: Number,
    default: 0
  }
})
PostSchema.plugin(timestamps)
var Post = mongoose.model('Post', PostSchema)
module.exports = Post
