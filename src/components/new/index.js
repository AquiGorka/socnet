import yo from 'yo-yo'

const New = ({ state, update }) => {
  const onclick = () => {
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
  }
  const { items } = state
  const { length } = items
  return yo`<div>
    <div onclick=${onclick}>Add new</div>
    <div>Current length: ${length}</div>
  </div>`
}

export default New
