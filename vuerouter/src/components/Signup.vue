<template>
<div>
  <h2>Hello World</h2>
<b-form @submit="onSubmit">
  <div class='main-login'>
    <h2> Login </h2>
    <div class='text-input'>
      <b-form-input v-model.trim="user.username"
                    type="text"
                    placeholder="Enter your Username">
      </b-form-input>
    </div>
    <div class='text-input'>
      <b-form-input v-model.trim="user.password"
                    type="password"
                    placeholder="Enter your Password">
      </b-form-input>
    </div>
    <div class='text-input'>
      <b-form-input v-model.trim="user.password"
                    type="password"
                    placeholder="Confirm your Password">
      </b-form-input>
    <b-button class='button' type="submit">Log In</b-button>
  </div>
  </div>
</b-form>
</div>
</template>

<style>
.main-login {
  background-color: #fff;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    margin: 30px auto;
    width: 50%;
    height: 400px;
    background-color: royalblue;
}

.text-input {
  margin: 10px auto;
  width: 90%;
}
.h2 {
  font-size: 2em;
  text-decoration-color: white;
  margin-left: 25%;
}
</style>

<script>

import axios from 'axios'
import router from '../router'

export default {
  name: 'Signup',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      // sends post request with this.user data
      axios.post('http://localhost:3000/user', this.user)
      .then(function (res) {
        router.push('login')
      })
    }
  }
}
</script>