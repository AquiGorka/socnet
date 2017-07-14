const _items = []

const state = {
  version: '0.0.5',
  // items
  add: function(item) { _items.push(item) },
  get items() { return _items },
}

export default state 
