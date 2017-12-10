import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SystemList from '@/components/SystemList'
import Signup from '@/components/Signup'
import DummySystem from '@/components/DummySystem'
import SystemView from '@/components/SystemView'

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
    },
    {
      path: '/dummysystem',
      name: 'DummySystem',
      component: DummySystem
    },
    {
      path: '/systemview',
      name: 'SystemView',
      component: SystemView
    }
  ]
})
