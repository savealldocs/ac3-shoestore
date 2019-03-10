var mongoose = require('mongoose')
var Schema = mongoose.Schema

var storeSchema = new Schema({
  storename: String,
  long: Number,
  lat: Number,  
  user: Object
})

module.exports = mongoose.model('Store', storeSchema)
