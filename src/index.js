import yo from 'yo-yo'
import level from 'level-browserify'
import hyperlog from 'hyperlog'
import to from 'flush-write-stream'
import wswarm from 'webrtc-swarm'
import signalhub from 'signalhub'

import App from './app'
import state from './state'

const db = level('socnet.db')
const log = hyperlog(db, { valueEncoding: 'json' })
//const sw = wswarm(signalhub('socnet-demo', ['http://localhost:9005/']))
const sw = wswarm(signalhub('socnet-demo', ['https://signalhub.mafintosh.com']))

const updateLog = (node) => {
  const { value } = node
  state.add(value)
  update()
}

sw.on('peer', function (peer, id) {
  console.log('PEER', id)
  peer.pipe(log.replicate()).pipe(peer)
})
sw.on('data', data => console.log('sw data: ', data))
// read the whole log
const stream = log.createReadStream({ live: true }).pipe(to.obj(function(node, enc, next) {
  updateLog(node)
  next()
}))

//const stream = log.createReadStream({ live: true })

stream.on('add', x => console.log('stream add: ', x))
stream.on('data', x => console.log('stream data: ', x))
log.on('data', x => console.log('log data: ', x))
log.on('add', x => console.log('log add: ', x))

stream.on('add', () => updateLog)
stream.on('data', () => updateLog)
log.on('data', () => updateLog)
log.on('add', () => updateLog)

// index.js
const root = document.body.appendChild(document.createElement('div'))
export const update = () => yo.update(root, App({ state, onAdd: newItem => {
  //state.add(newItem)
  console.log(log)
  log.append(newItem, (err, node) => {
//  log.add(null, newItem, (err, node) => {
    state.add(newItem)
    update()
  })
}}))

// first run
update()
