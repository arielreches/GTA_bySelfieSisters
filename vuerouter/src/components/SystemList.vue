<template>
    <b-row>
    <b-col cols="12">
      <h2>
        Hi, {{ msg }}!
        <b-link href="#/login">(login)</b-link>
      </h2>
      <b-table striped hover :items="systems" :fields="fields">
        <template slot="actions" scope="row">
         <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<style>
</style>

<script>

import axios from 'axios'
import router from '../router'

var systems = []
var msg = ''

export default {
  name: 'SystemList',
  data () {
    return {
      fields: {
        companyName: {label: 'Company Name', sortable: true, 'class': 'text-center'},
        systemName: {label: 'System Name', sortable: true},
        model: {label: 'Model', sortable: true},
        actions: {label: 'Action', 'class': 'text-center'}
      },
      systems: systems,
      errors: [],
      msg: msg
    }
  },
  created () {
    axios.get('http://localhost:3000/system/init')
      .then(response => {
        this.systems = response.data
      })
    axios.get(`http://localhost:3000/user/curr`)
      .then(response => {
        console.log(response.data)
        this.msg = response.data.username
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    details (item) {
      console.log(item)
      router.push({
        name: 'SystemView',
        params: {
          id: item._id
        }
      })
      console.log(item)
    }
  }
}
</script>
