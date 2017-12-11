<template>
<div>
  <h2>Enter Dummy Systems</h2>
<b-form @submit="onSubmit">
  <div class='main-login'>
    <h2> System </h2>
    <div class='text-input'>
      <b-form-input v-model.trim="system.companyName"
                    type="text"
                    placeholder="Enter Company Name">
      </b-form-input>
    </div>
    <div class='text-input'>
      <b-form-input v-model.trim="system.systemName"
                    type="text"
                    placeholder="Enter System Name">
      </b-form-input>
    </div>
    <div class='text-input'>
      <b-form-input v-model.trim="system.model"
                    type="text"
                    placeholder="Enter system Model">
      </b-form-input>
    <b-button class='button' type="submit">Add to DB</b-button>
  </div>
  </div>
</b-form>
<b-button class='button' @click.stop="viewsystems()">View Systems</b-button>
</div>
</template>

<script>

import axios from 'axios'
import router from '../router'

export default {
  name: 'DummySystem',
  data () {
    return {
      system: {}
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      // sends post request with this.user data
      axios.post('http://localhost:3000/system', this.system)
      .then(function (res) {
        console.log('added')
      })
    },
    viewsystems () {
      router.push('SystemList')
    }
  }
}
</script>