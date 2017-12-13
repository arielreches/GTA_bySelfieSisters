<template>
  <b-row>
    <b-col cols="12">
      <h2>
        {{system.systemName}} System Details 
        <b-btn variant='primary' size='sm' @click.stop="back()">Back to Group</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{system.systemName}}
        </template>
        <template slot="lead">
          Company Name: {{system.companyName}}<br>
          System Model: {{system.model}}<br>
          OS Version: {{system.osVersion}}<br>
          Tags: {{system.Tag}}<br>
          <template v-if='system.writeServiceTimeMillis != null'>
          Write Service Time: {{system.writeServiceTimeMillis}}
          </template>
        </template>
        <hr class="my-4">
        <!-- <b-btn variant="success" @click.stop="addtoGroup(system._id)">Add to Group</b-btn> -->
        <b-form @submit="addTag(tag)">
          <b-form-input v-model.trim="tag" type="text" placeholder="Add new Tag">
          </b-form-input>
          <br>
          <b-btn type="submit">Add Tag</b-btn>
        </b-form>
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
      system: system,
      tags: system.Tag,
      tag: ''
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
  },
  methods: {
    addTag (tag) {
      this.system.Tag.push(tag)
      axios.put('http://localhost:3000/system/' + this.$route.params.id, this.system)
      this.$router.push('grouplist')
      this.$router.push('home')
    }
  }
}
</script>