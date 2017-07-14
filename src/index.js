import yo from 'yo-yo'
import routes from 'base-router'
import level from 'level-browserify'
const db = level('socnet.db')
import hyperlog from 'hyperlog'
const log = hyperlog(db, { valueEncoding: 'json' })
import to from 'flush-write-stream'
import wswarm from 'webrtc-swarm'
import signalhub from 'signalhub'
//const sw = wswarm(signalhub('socnet-demo', ['http://localhost:9005/']))
const sw = wswarm(signalhub('socnet-demo', ['https://signalhub.mafintosh.com']))

sw.on('peer', function (peer, id) {
  console.log('PEER',id)
  peer.pipe(log.replicate()).pipe(peer)
})

log.createReadStream().pipe(to.obj(function (row, enc, next) {
  console.log('update from swarm: ', row)
  const { items, ...rest } = state
  const { value } = row
  state = { items: items.concat([value]) }
  update()
  next()
}))

// state store
let state = {
  version: '0.0.2',
  items: [],
}

// components
const Item = ({ item }) => yo`<li>${JSON.stringify(item)}</li>`
const Items = ({ items }) => yo`<ul>${items.sort((a, b) => a.t - b.t).map(item => Item({ item }))}`
const Version = ({ version }) => yo`<div>Version: ${version}</div>`
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
      state = { items: newItems, ...rest }
      console.log('new state: ', state)
        state.items.push(newItem)
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
const Nav = () => yo`<ul>
  <li><a href="#/">Home</a></li>
  <li><a href="#/section">Section</a></li>
  <li>
    <ul>
      <li><a href="#/inner/slug-1">Slug 1</a></li>
      <li><a href="#/inner/slug-2">Slug 2</a></li>
    </ul>
  </li>
</ul>`

// containers / sections
const Home = () => {
  const { items } = state
  return yo`<div><div>Home</div><div>Items:</div><div>${Items({ items })}</div></div>`
}
const Section = () => yo`<div>Section</div>`
const Inner = ({ params }) => yo`<div>Inner ${JSON.stringify(params)}</div>`
let Outlet = () => yo`<div>Loading</div>`

// router
const router = routes({
  '/': function() {
    return Home
  },
  '/section': function() {
    return Section
  },
  '/inner/:slug': function(params) {
    return function() {
      return Inner({ params })
    }
  }
}, { location: 'hash' })

// app.js
const App = ({ state, update }) => {
  console.log('App render. state: ', state)
  const { version } = state
  return yo`<div>
    ${Nav()}
    ${Version({ version })}
    ${New({ state, update })}
    ${Outlet()}
  </div>`
}

router.on('transition', (path, Component) => {
  Outlet = Component 
  update()
})
router.on('error', err => {
  console.warn('Transition error: ', err)
})

// index.js
const root = document.body.appendChild(document.createElement('div'))
const update = () => yo.update(root, App({ state, update }))
//update()

router.transitionTo('/')
