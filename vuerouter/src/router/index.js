import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SystemList from '@/components/SystemList'
import Signup from '@/components/Signup'

Vue.use(Router)

// define frontend routes
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/systems',
      name: 'SystemList',
      component: SystemList
    }
  ]
})
