<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Group
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Name">
          <b-form-input id="name" :state="state" v-model.trim="group.name"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
        <b-btn size="sm" @click.stop="cancel()">Cancel</b-btn>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'EditGroup',
  data () {
    return {
      group: {}
    }
  },
  created () {
    axios.get(`/group/` + this.$route.params.id)
    .then(response => {
      this.group = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`/group/` + this.$route.params.id, this.group)
      .then(response => {
        this.$router.push({
          name: 'GroupList',
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    cancel () {
          this.$router.push({
          name: 'GroupList',
        })
      }
  }
}
</script>