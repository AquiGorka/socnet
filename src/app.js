import yo from 'yo-yo'
import state from './state'
import { update } from './index'
import Nav from './components/nav'
import Version from './components/version'
import New from './components/new'

const Loading = () => yo`<div>Loading</div>`

export const Outlet = (() => {
  let _node = Loading()
  return n => {
    if (n) {
      _node = n()
    }
    return _node
  }
})()


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

export default App
