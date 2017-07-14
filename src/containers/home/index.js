import yo from 'yo-yo'
import Items from '../../components/items'
import New from '../../components/new'

const Home = ({ state, update, onAdd }) => {
  const { items } = state
  const { length } = items
  return yo`<div>
    <div>Home</div>
    <div>Current length: ${length}</div>
    <div>${New({ onAdd })}</div>
    <div>Items:</div>
    <div>${Items({ items })}</div>
  </div>`
}

export default Home
