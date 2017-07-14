import yo from 'yo-yo'
import state from '../../state'
import { update } from '../../index'
import { Outlet } from '../../app'
import Items from '../../components/items'
import New from '../../components/new'

const Home = () => {
  const { items } = state
  const { length } = items
  return yo`<div>
    <div>Home</div>
    <div>Current length: ${length}</div>
    <div>${New({ onAdd: i => {
        state.add(i)
        update()
    }})}</div>
    <div>Items:</div>
    <div>${Items({ items })}</div>
  </div>`
}

export default Home
