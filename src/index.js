import yo from 'yo-yo'
import level from 'level-browserify'
import hyperlog from 'hyperlog'
import to from 'flush-write-stream'
import wswarm from 'webrtc-swarm'
import signalhub from 'signalhub'

import App from './app'
import router from './router'
import state from './state'

const db = level('socnet.db')
const log = hyperlog(db, { valueEncoding: 'json' })
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
  //state = { items: items.concat([value]) }
  update()
  next()
}))

// index.js
const root = document.body.appendChild(document.createElement('div'))
export const update = () => yo.update(root, App({ state, update }))

// first run
update()
router.transitionTo('/')
