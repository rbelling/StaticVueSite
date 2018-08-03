import Vue from 'vue'
import Router from 'vue-router'
import Wedding from '@/components/Wedding'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wedding',
      component: Wedding
    }
  ]
})
