import yo from 'yo-yo'
import state from './state'
import { update } from './index'
import Nav from './components/nav'
import Version from './components/version'

const Loading = () => yo`<div>Loading</div>`

export const Outlet = (() => {
  let _node = Loading()
  return n => {
    if (n) {
      _node = n
    }
    return _node
  }
})()

const App = ({ state, update }) => {
  console.log('App render. state: ', state)
  const { version } = state
  return yo`<div>
    ${Nav()}
    ${Outlet()}
    ${Version({ version })}
  </div>`
}

export default App
