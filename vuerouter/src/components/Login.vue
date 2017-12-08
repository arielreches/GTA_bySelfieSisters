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
  <b-button type="submit">Log In></b-button>
</div>
</template>

<style>
</style>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {
        user: '',
        pass: ''
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    }
  }
}
</script>