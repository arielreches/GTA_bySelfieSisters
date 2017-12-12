<template>
<div>
<b-form @submit="login">

<div class = "login">
  <h1>Sign In To Your Account</h1>
  </br>

  <b-form-input v-model.trim="user.username" type = "text"  placeholder="Enter your Username"></b-form-input>
  </br>
  <b-form-input v-model.trim="user.password" type="password" placeholder="Enter your Password"></b-form-input>
  </br>
  <b-button id='loginButton' type="submit">Log In</b-button>

  <router-link to='signup'>Not a GTA User? Click here to sign up.</router-link>
</div>

</form>

</b-form>
</div>


</template>

<style>
.login {
    padding-left: 35%;
    padding-right: 35%;
    padding-top: 10%;
}
#loginButton:hover {
  background-color: #03BE74;
  border-color: #03BE74
}

</style>

<script>

import axios from 'axios'
import router from '../router'
// defined here to be able to use them both above and below
var user = {
  username: '',
  password: ''
}

export default {
  name: 'Login',
  data () {
    return {
      user: user
    }
  },
  methods: {
    login (evt) {
      evt.preventDefault()
      // send HTTP GET request to /user/login with params of username and password
      axios.get('http://localhost:3000/user/login/t', {
        params: {
          username: user.username,
          password: user.password
        }
      }) // after sent
      .then(function (res) {
        var success = res.data // response.data passed from express server
        if (success === 'success') {
          router.push('home')// redirect to /systems on success
        } else {
          alert('Invalid Username and Password')
        }
      })
    }
  }
}
</script>