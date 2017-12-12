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
          Systems in Group: {{group.systemsIn}}<br>
          Users in Group: {{group.usersIn}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{group.updated_date}}
        </p>
        <b-btn href= '#/home'>Home</b-btn>
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
      user: []
    }
  },
  created () {
    var creator 
    axios.get(`http://localhost:3000/group/` + this.$route.params.id)
    .then(response => {
      this.group = response.data
      console.log(this.groupCreator)
       creator = this.group.groupCreator
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.get(`http://localhost:3000/user/` + creator)
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
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
        this.$router.push({
          name: 'Home'
        })
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
