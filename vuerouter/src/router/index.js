import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SystemList from '@/components/SystemList'
import Signup from '@/components/Signup'
import SystemView from '@/components/SystemView'
import About from '@/components/About'
import Contact from '@/components/Contact'
import GroupList from '@/components/GroupList'
import ShowGroup from '@/components/ShowGroup'
import EditGroup from '@/components/EditGroup'
import UserSystems from '@/components/UserSystems'

Vue.use(Router)

// define frontend routes
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
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
      path: '/systemView',
      name: 'SystemView',
      component: SystemView
    },
    {
      path: '/grouplist',
      name: 'GroupList',
      component: GroupList
    },
    {
      path: '/showgroup',
      name: 'ShowGroup',
      component: ShowGroup
    },
    {
      path: '/editgroup',
      name: 'EditGroup',
      component: EditGroup
    },
    {
      path: '/usersystems',
      name: 'UserSystems',
      component: UserSystems
    }
  ]
})
