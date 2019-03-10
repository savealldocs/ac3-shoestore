var Bus = require('busmq')
var bus = Bus.create({redis: ['redis://127.0.0.1:6379']})

let addMessageToQueue = (store, msg)=> {
  bus.on('online', function () {
    var q = bus.queue(store)
    q.on('attached', function () {
      console.log('attached to queue')
    })
    q.attach()
    q.push({'message': 'msg'})
  })
  bus.connect()
}
let getMessageFromQueue = (store)=>{
  bus.on('online', function () {
    var q = bus.queue(store)
    q.on('attached', function () {
      console.log('attached to queue. messages will soon start flowing in...')
    })
    q.on('message', function (message, id) {
      if (message === 'my name if foo') {
        q.detach()
      }
    })
    q.attach()
    q.consume() // the 'message' event will be fired when a message is retrieved
  })
  bus.connect()
}
function MessageLogic (store) {
  return {
    addMessageToQueue,
    getMessageFromQueue
  }
}
module.exports = MessageLogic
