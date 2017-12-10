import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SystemList from '@/components/SystemList'
import Signup from '@/components/Signup'
import DummySystem from '@/components/DummySystem'
import SystemView from '@/components/SystemView'
<<<<<<< HEAD
=======
import EditBook from '@/components/EditBook'
import CreateBook from '@/components/CreateBook'
import BookList from '@/components/BookList'
import ShowBook from '@/components/ShowBook'
>>>>>>> 17ff34948e1bc9dfebd289165a114be68b546538

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
      path: '/systemView',
      name: 'SystemView',
      component: SystemView
    },
    {
      path: '/editbook',
      name: 'EditBook',
      component: EditBook
    },
    {
      path: '/showbook',
      name: 'ShowBook',
      component: ShowBook
    },
    {
      path: '/createbook',
      name: 'CreateBook',
      component: CreateBook
    },
    {
      path: '/booklist',
      name: 'BookList',
      component: BookList
    }
  ]
})
