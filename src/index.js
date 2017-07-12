import yo from 'yo-yo'
import routes from 'base-router'

// state store
const state = {
  version: '0.0.1',
  count: 1,
}

// components
const Version = ({ version }) => yo`<div>Version: ${version}</div>`
const Counter = ({ state, update }) => {
  const onclick = () => {
    state.count++
    update()
  }
  const { count } = state
  return yo`<div onclick=${onclick}>Count (click on me to increment): ${count}</div>`
}
const Nav = () => yo`<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>`

// containers / sectiions
const Home = () => yo`<div>Home</div>`
const Section = () => yo`<div>Section</div>`
const Inner = ({ params }) => yo`<div>Inner ${JSON.stringify(params)}</div>`
let Outlet = () => yo`<div>Loading</div>`

// app.js
const App = ({ state, update }) => {
  const { version, count } = state
  return yo`<div>
    ${Nav()}
    ${Counter({ state, update })}
    ${Version({ version })}
    <div>Count: ${count}</div>
    ${Outlet()}
  </div>`
}

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

// index.js
const root = document.body.appendChild(document.createElement('div'))
const update = () => yo.update(root, App({ state, update }))
update()

router.on('transition', (path, Component) => {
  Outlet = Component 
  update()
})
router.on('error', err => {
  console.warn('Transition error: ', err)
})

router.transitionTo('/')
