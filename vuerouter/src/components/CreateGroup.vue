<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Make new Group
      </h2>
      <b-btn href="/systems">System List</b-btn>
            <b-form-checkbox-group stacked v-model="selected" name="systempick" :options="options">
            </b-form-checkbox-group>
            <!-- <b-form-checkbox-group stacked v-model="selected" name="userpick" :options="options"> -->
            <!-- </b-form-checkbox-group> -->
      <b-btn size="sm" @click.stop="select(selected)">Details</b-btn>
</template>

<script>

import axios from 'axios'

export default {
  name: 'CreateBook',
  data () {
    return {
      selected: [],
      systems: [],
      users: [],
      options: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/system/init`)
    .then(response => {
      this.systems = response.data
      console.log(this.systems[1])
      console.log(this.systems[1].companyName)
      var holder = [this.systems.length]
      var temp = {}
      for (var i = 0; i < this.systems.length; i++) {
        // console.log(this.systems[i])
        temp["text"]=this.systems[i]["companyName"]
        temp["value"]=this.systems[i]["_id"]
        // console.log(temp)
        holder[i]=temp
        temp={}
        // console.log(this.systems[i]._id)
      }
      console.log(holder)
      this.options=holder;
      console.log(this.options)
      // console.log(temp)
      // this.options = temp
      
    })
    .catch(e => {
      console.log(e);
      // this.errors.push(e)
    })
    axios.get(`http://localhost:3000/user`)
    .then(response => {
      this.users = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    console.log(this.systems)
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
    },
    select (selected) {
      console.log(selected)
    }
  }
}
</script>
