import yo from 'yo-yo'

const Item = ({ item }) => yo`<li>${JSON.stringify(item)}</li>`

const Items = ({ items }) => yo`<ul>${items.sort((a, b) => a.t - b.t).map(item => Item({ item }))}`

export default Items
