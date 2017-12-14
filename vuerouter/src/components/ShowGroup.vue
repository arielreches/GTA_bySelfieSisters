<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Group Details
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{group.name}}
        </template>
        <template slot="lead">
          Group Creator: {{this.group.groupCreator}}<br>
          Systems in Group: {{this.systems}}<br>
          Users in Group: {{this.user}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{group.updated_date}}
        </p>
        <b-btn variant='primary'href= '#/grouplist'>Home</b-btn>
        <b-btn variant="success" @click.stop="editgroup(group._id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deletegroup(group._id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ShowGroup',
  data () {
    return {
      group: [],
      user: [],
      systems: [],
    }
  },
  created () {
    var creator
    axios.get(`http://localhost:3000/group/` + this.$route.params.id)
    .then(response => {
      this.group = response.data

      creator = this.group.groupCreator
      // console.log("made it")
      // console.log(response.data)
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.get(`http://localhost:3000/user/`)
    .then(response => {
      this.user = this.group.usersIn;

      for(var i = 0 ; i < this.user.length ; i ++ ){
        console.log(this.user[i])
        for( var j = 0 ; j < response.data.length ; j ++ ){

          if(this.user[i]==response.data[j]['_id']){
            console.log(response.data[j]['username'])
            this.user[i] = response.data[j]['username']
          }
          if(this.group.groupCreator == response.data[j]['_id']){
            this.group.groupCreator = response.data[j]['username']
          }
        }
      }
      console.log(this.user)

    })
    .catch(e => {
      console.log(e)
      this.errors.push(e)
    })

    axios.get(`http://localhost:3000/system/init`)
    .then(response => {
      this.systems = this.group.systemsIn;
      for(var i = 0 ; i < this.systems.length ; i ++ ){
        for( var j = 0 ; j < response.data.length ; j ++ ){
          if(this.systems[i]==response.data[j]['_id']){
            this.systems[i] = response.data[j]['companyName']
          }
        }
      }
      console.log(this.systems)
    })
    .catch(e => {
      console.log(e);
    })
  },
  methods: {
    editgroup (groupid) {
      this.$router.push({
        name: 'EditGroup',
        params: { id: groupid }
      })
    },
    deletegroup (groupid) {
      axios.delete('http://localhost:3000/group/' + groupid)
      .then((result) => {
        this.$router.push('groupList')
      })

      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
