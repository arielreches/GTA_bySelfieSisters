<template>
<div>
  <b-form @submit="onSubmit">
    <div class='main-login'>
      <h2>Create A New Account</h2>
      </br>
      <b-form-input v-model.trim="user.username" type = "text"  placeholder="Enter A New Username"></b-form-input>
      </br>
      <b-form-input v-model.trim="user.password" type = "password"  placeholder="Create A New Password"></b-form-input>
      </br>
      <b-form-input v-model.trim="user.confirmPassword" type = "password"  placeholder="Confirm Your Password"></b-form-input>
      </br>
      <b-button class='button' type="submit">Log In</b-button>
      <router-link to='login'>Click here for login page</router-link>
    </div>
        </div>
    </div>
  </b-form>
</div>
</template>

<style>
  .main-login{
    padding-left: 35%;
    padding-right: 35%;
    padding-top: 10%;
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
      if (this.user.password === this.user.confirmPassword) {
        evt.preventDefault()
        // sends post request with this.user data
        axios.post('http://localhost:3000/user', this.user)
        .then(function (res) {
          router.push('systems')
        })
      } else {
        alert('Passwords do not match.')
      }
    }
  }
}
</script>
