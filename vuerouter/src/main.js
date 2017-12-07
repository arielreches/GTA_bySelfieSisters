// main.js

import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);


const routes = [
    {
        name: 'CreateItem',
        path: '/',
        component: CreateItem
    }
]

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router })).$mount('#app');

import App from './App.vue';
new Vue(Vue.util.extend({ router }, App)).$mount('#app');

import CreateItem from './componenets/CreateItem.vue';