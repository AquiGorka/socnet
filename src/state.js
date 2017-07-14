const _items = []

let state = {
  version: '0.0.4',
  // items
  add: function(item) { _items.push(item) },
  get items() { return _items },
}

export default state 

    /*
    const { items, ...rest } = state
    const newItem = { r: Math.random(), t: Date.now() }
    log.append({ item: newItem }, function (err, node) {
      if (err) return console.error(err)
      //console.log('log appended: ', node, node.value)
      // node.value.item === newItem  <- true
      const newItems = items.concat(newItem)
      console.log('newItems: ', newItems)
      //state = { items: newItems, ...rest }
      console.log('new state: ', state)
      update()
    })
    */

