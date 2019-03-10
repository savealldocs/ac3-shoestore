var mongoose = require('mongoose')
var Schema = mongoose.Schema

var itemStockCacheSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  date: Date,
  stockLevel: Number,
  user: Object
})

module.exports = mongoose.model('ItemStockCache', itemStockCacheSchema)