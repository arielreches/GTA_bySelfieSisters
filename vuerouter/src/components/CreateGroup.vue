<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Make new Group
      </h2>
      <b-btn href="/systems">System List</b-btn>
      <b-form @submit="onSubmit">
            <ul id="example-1">
                <li v-for="s in system">
                    {{ s.companyName }}
                    <p>{{ s._id }}</p>
                </li>
            </ul>
            <ul id="example-2">
                <li v-for="u in user">
                    {{ u.username }}
                    <p>{{ u._id }}</p>
                </li>
            </ul>
        <b-button type="submit" variant="primary">Create</b-button>
      </b-form>
</template>

<script>

import axios from 'axios'

export default {
  name: 'CreateBook',
  data () {
    return {
      system: [],
      user: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/system/init`)
    .then(response => {
      this.system = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://localhost:3000/user`)
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/book`, this.book)
      .then(response => {
        this.$router.push({
          name: 'ShowBook',
          params: { id: response.data._id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>
