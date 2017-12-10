<template>
  <b-jumbotron>
    <template slot='header'>
      {{system.systemName}}
    </template>
    <template slot='lead'>
      Company Name: {{system.companyName}}
      Model: {{system.model}}
    </template>
    <b-form @submit='addTag'>
      <b-form-input v-model.trim='system.tag'
                    type='text'
                    placeholder='Enter a new tag'>
      </b-form-input>
      <b-button class='button' type='submit'>Add Tag</b-button>
    </b-form>
  </b-jumbotron>
</template>

<script>

import axios from 'axios'

export default {
  name: 'SystemView',
  data () {
    return {
      book: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/system/` + this.$route.params.id)
    .then(response => {
      this.system = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>