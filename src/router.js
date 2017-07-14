import routes from 'base-router'
import Home from './containers/home'
import Section from './containers/section'
import Inner from './containers/inner'
import { Outlet } from './app'
import { update } from './index'

const router = routes({
  '/': function() {
    return Home
  },
  '/section': function() {
    return Section
  },
  '/inner/:slug': function(params) {
    return function() {
      return Inner({ params })
    }
  }
}, { location: 'hash' })

router.on('transition', (path, node) => {
  Outlet(node())
  update()
})

router.on('error', (name, err) => {
  console.warn('Transition error: ', name, err)
})

export default router
