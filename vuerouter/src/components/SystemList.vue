<template>
    <b-row>
    <b-col cols="12">
      <h2>
        Hi, {{ msg }}!
      </h2>
      <b-form-input v-model="searchString" type = "text" placeholder="Search..."></b-form-input>
      <p>Value: {{ this.searchString }}</p>
      <b-table striped hover :items="filteredArticles" :fields="fields">
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
      searchString: '',
      fields: {
        companyName: {label: 'Company Name', sortable: true, 'class': 'text-center'},
        systemName: {label: 'System Name', sortable: true},
        model: {label: 'Model', sortable: true},
        Tag: {label: 'Tags'},
        actions: {label: 'Action', 'class': 'text-center'}
      },
      systems: systems,
      errors: [],
      msg: msg
    }
  },
  created () {
    axios.get(`http://localhost:3000/group/` + this.$route.params.id)
    .then(response => {
      console.log('In created method in get group now')
      this.group = response.data
      console.log(this.group)
      var holder = []
      for (var i = 0; i < this.group.systemsIn.length; i++){
        console.log(this.group.systemsIn[i])
        axios.get('http://localhost:3000/system/' + this.group.systemsIn[i])
        .then(response => {
           holder.push(response.data)
           console.log('holder in get')
           console.log(holder)
          //  this.systems = holder
          //  console.log(this.systems)
        })
        this.systems = holder
      }
    })
    .catch(e => {
      this.errors.push(e)
    })
    // var holder = [this.group.systemsIn.length]
    // for (var i = 0; i < this.group.systemsIn.length; i++){
    //   console.log(this.group.systemsIn[i])
    //}
    axios.get(`http://localhost:3000/user/curr`)
      .then(response => {
        console.log(response.data)
        this.msg = response.data.username
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
                    else if(item.Tag){
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
      }
    }
  }
</script>
