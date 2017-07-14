import yo from 'yo-yo'
import state from './state'
import { update } from './index'
import Nav from './components/nav'
import Version from './components/version'
import New from './components/new'

export let Outlet = () => yo`<div>Loading</div>`

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
