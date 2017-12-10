<template>
    <b-row>
    <b-col cols="12">
      <h2>
        Systems List
      </h2>
      <b-btn href="#/login">Logout</b-btn>
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
      msg: ''
    }
  },
  created () {
    axios.get('http://localhost:3000/system/init')
      .then(response => {
        this.systems = response.data
      })
  },
  computed: {
    loadUser () {
      axios.get(`http://localhost:3000/user`)
      .then(response => {
        this.user = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
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
