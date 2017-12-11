<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Vue System
        <b-link href="#/systems">(System List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{system.systemName}}
        </template>
        <template slot="lead">
          Company Name: {{system.companyName}}<br>
          System Model: {{system.model}}<br>
          OS Version: {{system.osVersion}}<br>
          <template v-if='system.writeServiceTimeMillis != null'>
          Write Service Time: {{system.writeServiceTimeMillis}}
          </template>
        <hr class="my-4">
        <b-btn variant="success" @click.stop="editbook(book._id)">Add to Group</b-btn>
        <b-btn variant="danger" @click.stop="deletebook(book._id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>
<script>
import axios from 'axios'

var system = {}

export default {
  name: 'SystemView',
  data () {
    return {
      system: system
    }
  },
  created () {
    axios.get(`http://localhost:3000/system/` + this.$route.params.id)
    .then(response => {
      this.system = response.data
      console.log(this.system)
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>