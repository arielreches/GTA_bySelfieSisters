// main.js

import Vue from 'vue';
import CreateItem from './components/CreateItem.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

const router = new VueRouter({ mode: 'history', routes: routes});
new Vue(Vue.util.extend({ router })).$mount('#app');

const routes = [
    {
          name: 'CreateItem',
          path: '/',
          component: CreateItem
      }
  ];