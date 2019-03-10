const TransactionsLogic = require('./business/transactions-logic')
const ItemsLogic = require('./business/items-logic.js')
const InventoryLogic = require('./business/inventory-logic.js')
const OrdersLogic = require('./business/orders-logic')
const MessageLogic = require('./business/messagequeue')
const Store = require('./routes/store-logic.js')
const ItemsRoutes = require('./routes/items.js')
const TransactionsRoutes = require('./routes/transactions.js')
const OrdersRoutes = require('./routes/orders.js')
const InventoryRoutes = require('./routes/inventory.js')
const MessageQueueRoutes = require ('./routes/messagequeue.js')
const Q = require('q')
const mongoose = require('mongoose')
mongoose.Promise = Q.Promise

function Inventory () {
  this.connect = mongoose.connect.bind(mongoose)
  this.store = Store.Store()
  this.items = ItemsLogic()  
  this.MessageLogic = MessageLogic(this.store)
  this.transactions = TransactionsLogic(this.items, this.store, this.MessageLogic)
  this.orders = OrdersLogic(this.transactions, this.store, this.MessageLogic)
  this.inventory = InventoryLogic(this.transactions, this.orders, this.store, this.MessageLogic)
  this.itemsRoutes = ItemsRoutes(this.items)
  this.messageQueueRoutes = MessageQueueRoutes(this.MessageLogic)
  this.transactionsRoutes = TransactionsRoutes(this.transactions)
  this.ordersRoutes = OrdersRoutes(this.orders)
  this.inventoryRoutes = InventoryRoutes(this.inventory)
  this.allRoutes = [this.itemsRoutes, this.transactionsRoutes, this.inventoryRoutes, this.ordersRoutes, this.messageQueueRoutes]
  this.startMonitor = this.transactions.startMonitor
  this.stopMonitor = this.transactions.stopMonitor
}
module.exports = Inventory
