<template>
    <b-row>
    <b-col cols="12">
      <h2>
        {{ msg }}'s Systems
      </h2>
      <b-form-input v-model="searchString" type = "text" placeholder="Search..."></b-form-input>
      <b-table  hover :items="filteredArticles" :fields="fields">
        <template slot="Group" scope="row">
          <p v-for="group in row.value">
            {{ group.name }}
          </p>
          <!-- {{ row.value.name }} -->
        </template>
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
var group = {}

export default {
  name: 'UserSystems',
  data () {
    return {
      searchString: '',
      fields: {
        companyName: {label: 'Company Name', sortable: true, 'class': 'text-center'},
        systemName: {label: 'System Name', sortable: true},
        model: {label: 'Model', sortable: true},
        Group: {label: 'Groups'},
        Tag: {label: 'Tags'},
        actions: {label: 'Action', 'class': 'text-center'}
      },
      systems: systems,
      errors: [], 
      msg: msg,
      groupid: String
    }
  },
  created () {
    axios.get(`http://localhost:3000/user/curr`)
      .then(response => {
        this.msg = response.data.username
        this.user = response.data
        axios.get(`http://localhost:3000/user/` + this.user._id + '/systemsall')
        .then(response => {
          console.log('In created method in get group now')
          console.log(response.data)
          systems = response.data
          console.log(Array.from(new Set(systems)))
          var uniq = Array.from(new Set(systems))
          console.log(uniq)
          axios.post(`http://localhost:3000/system/many` , uniq)
          .then(response => {
            console.log(response)
            this.systems = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
    })
    .catch(e => {
      this.errors.push(e)
    })
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  computed: {
    // A computed property that holds only those articles that match the searchString.
    filteredArticles: function () {
        var articles_array = this.systems;
        var searchString = this.searchString;

        var tag = "companyName";

        if(!searchString){
            return articles_array;
        }
        else {
            searchString = searchString.trim().toLowerCase();
            articles_array = articles_array.filter(
                function (item) {
                    if (item.companyName.toLowerCase().indexOf(searchString) !== -1 || 
                    item.systemName.toLowerCase().indexOf(searchString) !== -1 ||
                    item.model.toLowerCase().indexOf(searchString) !== -1) {
                       return item;
                    }
                    else if(item.Group){
                      for(var i = 0; i < item.Group.length; i++){
                        if(item.Group[i].name.toLowerCase().indexOf(searchString) !== -1){
                          return item;
                      }
                      }
                    }
                    if(item.Tag){
                      for(var i = 0; i < item.Tag.length; i++){
                        if(item.Tag[i].toLowerCase().indexOf(searchString) !== -1){
                        return item;
                      }
                      }
                    }
                }
            )
        }
        // Return an array with the filtered data.
        return articles_array;
    }
  },
  methods: {
      makeActive: function (item) {
        this.tagName = item;
        var form = document.getElementById("inputForm");
        form.reset()
        this.searchString='';
      },
      details (item) {
        console.log(item)
        router.push({
          name: 'SystemView',
          params: {
            id: item._id
          }
        })
        console.log(item)
      },
    }
  }
</script>
