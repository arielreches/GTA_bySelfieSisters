<template>
<div>
  <b-form @submit="onSubmit">
    <div class='main-login'>
      <h2>Create A New Account</h2>
      </br>
      <b-form-input v-model.trim="user.firstName" type = "text"  placeholder="Enter First Name"></b-form-input>
      </br>
      <b-form-input v-model.trim="user.lastName" type = "text"  placeholder="Enter Last Name"></b-form-input>
      </br>
      <b-form-input v-model.trim="user.username" type = "text"  placeholder="Enter A New Username"></b-form-input>
      </br>
      <b-form-input v-model.trim="user.password" type = "password"  placeholder="Create A New Password"></b-form-input>
      </br>
      <b-form-input v-model.trim="user.confirmPassword" type = "password"  placeholder="Confirm Your Password"></b-form-input>
      </br>
      <b-form-checkbox id="checkbox1"
                     v-model="status"
                     value="admin"
                     unchecked-value="non_admin"
                     v-b-tooltip.hover title="Selectable Admin User for Ease of demo">
      Is admin user?
    </b-form-checkbox>
      <b-button id="loginButton" type="submit">Sign Up</b-button></br>
      <router-link to='login'>Click here to go back to login.</router-link>
    </div>
        </div>
    </div>
  </b-form>
</div>
</template>

<style>
#loginButton:hover {
  background-color: #03BE74;
  border-color: #03BE74
}
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
      user: {},
      status: 'non_admin'
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      console.log(this.status)
      var groupid
      if (this.user.password === this.user.confirmPassword) {
        if (this.status === 'admin'){
          this.user.admin = true
          console.log(this.user)
          axios.post(`/user`, this.user)
          .then(response => {
            console.log('user post')
            console.log(response.data)
            var user = response.data
            axios.get(`/system/init`)
            .then(response => {
              console.log('system init')
              this.systems = response.data
              var group = {}
              group.name = 'All Systems'
              group.systemsIn = []
              for (var i =0; i < this.systems.length; i++){
                group.systemsIn.push(this.systems[i]._id)
              }
              group.usersIn = []
              group.usersIn.push(user._id)
              group.groupCreator = user._id
              console.log(this.systems)
              axios.post(`/group`, group)
              .then(response => {
                console.log("group post")
                console.log(response.data)
                groupid = response.data._id
                user.Group.push(groupid)
                axios.put(`/user/` + user._id, user)
                .then(response => {
                console.log("user update")
                console.log(response.data)
                console.log("finish")
                router.push('login')                
              })
              .catch(e => {
                console.log(e)
              })
              })
              .catch(e => {
                console.log(e)
              })
            })
            .catch(e => {
              console.log(e)
            })

          .catch(e => {
            console.log(e)
          })
        })
      } else if (this.status === 'non_admin')
        { this.user.admin = false
        // sends post request with this.user data
        axios.post('/user', this.user)
        .then(function (res) {
          router.push('login')
        })
      }
      } else {
        alert('Passwords do not match.')
      }
    }
  }
}
</script>
