import Vue from 'vue'
import Router from 'vue-router'
/*
import BookList from '@/components/BookList'
import ShowBook from '@/components/ShowBook'
import CreateBook from '@/components/CreateBook'
import EditBook from '@/components/EditBook'
*/
import Login from '@/components/Login'
import SystemList from '@/components/SystemList'

Vue.use(Router)

export default new Router({
  routes: [
    /*
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/show-book/:id',
      name: 'ShowBook',
      component: ShowBook
    },
    {
      path: '/add-book',
      name: 'CreateBook',
      component: CreateBook
    },
    {
      path: '/edit-book/:id',
      name: 'EditBook',
      component: EditBook
    },
    */
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
      path: '/systems',
      name: 'SystemList',
      component: SystemList
    }
  ]
})
