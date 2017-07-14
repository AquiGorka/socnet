import yo from 'yo-yo'
import Home from './containers/home'
import Version from './components/version'

const App = ({ state, update }) => {
  const { version } = state
  return yo`<div>
    ${Home({ state, onAdd: () => {
      console.log('onAdd')
    }})}
    ${Version({ version })}
  </div>`
}

export default App
