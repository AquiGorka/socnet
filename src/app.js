import yo from 'yo-yo'
import Nav from './components/nav'
import Version from './components/version'

const Loading = () => yo`<div>Loading</div>`

export const Outlet = (() => {
  let node = Loading()
  return n => {
    if (n) {
      node = n
    }
    return node
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
