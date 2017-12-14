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
          Recommended OS Version: {{system.recommended.osVersion}}<br>
          Common Provisional Groups (CPGs): {{system.cpgCount}}<br>
          Country/Region of Origin: {{system.location.region + '/' + system.location.country}}<br>
          Capacity Percentage(Raw Storage): {{parseInt(system.capacity.total.freePct) + '%' + ' (' + parseInt(system.capacity.total.freeTiB) + ' TiB)'}}<br>
          Tags:<br>
          
          <b-button v-for="item in system.Tag" size="small" variant="outline-success" :key="item.id">
            {{item}}
          </b-button>
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
      id:'',
      system: system,
      tags: system.Tag,
      tag: ''
    }
  },
  created () {

    this.id=this.$route.params.groupid
    console.log(this.id)

    axios.get(`http://localhost:3000/system/` + this.$route.params.id)
    .then(response => {
      this.system = response.data
      console.log("made it")
      console.log(this.system)
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    addTag (tag) {
      this.system.Tag.push(tag)
      this.system.Tag = this.system.Tag.filter(function(n){ return n != ""})
      axios.put('http://localhost:3000/system/' + this.$route.params.id, this.system)
      this.$router.push('systemView')
      tag = ""
    },
    back(){
      this.$router.push({
        name: 'SystemList',
        params: { id: this.id }
      })
    }
  }
}
</script>