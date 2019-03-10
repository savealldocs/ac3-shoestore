const store = require('../models/store')
let getStore = (query) => (store.find(query))

function StoreLogic() {
  return {    
    getStore,    
  }
}
module.exports = StoreLogic
