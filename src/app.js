import yo from 'yo-yo'
import Home from './containers/home'
import Version from './components/version'

const App = ({ state, onAdd }) => {
  const { version, items } = state
  return yo`<div>
    ${Home({ items, onAdd })}
    ${Version({ version })}
  </div>`
}

export default App
