import yo from 'yo-yo'
import Nav from './components/nav'
import Version from './components/version'

const Loading = () => yo`<div>Loading</div>`

export const Outlet = (() => {
  let n = Loading()
  return node => {
    if (node) {
      n = node
    }
    return n
  }
})()

const App = ({ state, update }) => {
  const { version } = state
  return yo`<div>
    ${Nav()}
    ${Outlet()}
    ${Version({ version })}
  </div>`
}

export default App
