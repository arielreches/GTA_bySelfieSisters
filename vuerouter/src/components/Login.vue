<template>
<div>
<h2> Login </h2>
<b-form @submit="onSubmit">
  <b-form-input v-model="form.user"
                  type="text"
                  placeholder="Enter your Username"></b-form-input>
  <b-form-input v-model="form.pass"
                  type="password"
                  placeholder="Enter your Password"></b-form-input>
  <b-button type="submit">Log In</b-button>
</div>
</template>

<style>
</style>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        user: '',
        pass: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('http://localhost:3000/api/login', {
        user: 'test',
        pass: 'why'
      }).then(function () {
        console.log('done')
      })
    }
  }
}
</script>