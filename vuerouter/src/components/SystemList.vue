<template>
    <b-row>
    <b-col cols="12">
      <div style="padding-left:1%;padding-right:1%;padding-bottom:1%;padding-top:2%;">
        <h2>
          Hi, {{ msg }}!
        </h2>
        <div style="padding-bottom:1%;padding-right:80%;padding-top:1%;">
          <b-form-input v-model="searchString" type = "text" placeholder="Search..."></b-form-input>
        </div>
      </div>
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
      id: '',
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
    
    this.id=this.$route.params.id
    console.log(this.id)
    axios.get('/group/' + this.$route.params.id + '/populate')
      .then(response => {
        this.systems = response.data.systemsIn
        console.log(this.systems)
      })
    axios.get(`/user/curr`)
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
          form.reset();
          this.searchString='';
      },
        },
  methods: {
    details (item) {
      console.log(item)
      router.push({
        name: 'SystemView',
        params: {
          id: item._id,
          groupid: this.id
        }
      })
      console.log(item)
    }
  }
}
</script>
