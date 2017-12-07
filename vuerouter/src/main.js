// main.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import CreateItem from './components/CreateItem.vue';

const routes = [
    {
          name: 'CreateItem',
          path: '/',
          component: CreateItem
      }
  ];



const router = new VueRouter({ mode: 'history', routes: routes });


new Vue(Vue.util.extend({ router }, App)).$mount('#app');

Vue.use(VueRouter);
Vue.use(VueAxios, axios);


