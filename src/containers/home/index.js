import yo from 'yo-yo'
import state from '../../state'
import Items from '../../components/items'

const Home = () => {
  const { items } = state
  return yo`<div><div>Home</div><div>Items:</div><div>${Items({ items })}</div></div>`
}

export default Home
