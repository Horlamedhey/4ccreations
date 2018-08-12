var mongoose = require('mongoose')

module.exports.connect = function () {
  // mongoose.connect('mongodb://variable:variable1@ds241570.mlab.com:41570/ccreation')
  mongoose.connect('mongodb://localhost:27017/ccreations', { useNewUrlParser: true })
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', function (callback) {
    console.log('Connection Succeeded')
  })
  return db
}
