import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Error404 from '@/components/Error404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '*',
      name: '404',
      component: Error404
    }
  ]
})
