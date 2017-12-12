<template>
  <b-row>
    <b-col cols="12">
      <h2>
        System Groups
      </h2>
      <b-btn v-b-toggle.createGroupForm variant="primary">Create Group</b-btn>
        <b-collapse id="createGroupForm" class="mt-2">
          <b-card>
              <b-form @submit="onSubmit">
                <div>
                  <b-form-input v-model="groupName"
                                type="text"
                                placeholder="Group Name..."
                                class = "groupNameInput"></b-form-input>
                </div>
              <b-btn v-b-toggle.collapse1 class="addButton">Add Systems</b-btn>
              <b-collapse id="collapse1" class="mt-2">
                <b-card>
                      <b-form-checkbox-group v-model="s_selected" name="flavour1" :options="soptions">
                      </b-form-checkbox-group>
                </b-card>
              </b-collapse><br>

                <b-btn v-b-toggle.collapse2 class="addButton">Add Users</b-btn>
                <b-collapse id="collapse2" class="mt-2">
                  <b-card>
                       <b-form-checkbox-group v-model="u_selected" name="flavour1" :options="uoptions">
                      </b-form-checkbox-group>
                      </li>
                  </b-card>
                </b-collapse><br>
                <b-button type="submit" variant="primary">Create</b-button>
              </b-form>
          </b-card>
        </b-collapse>
</template>

<style>
  .groupNameInput {
    margin-bottom: 10px;
  }
  .addButton{
    background-color: #ccc;
    margin-bottom: 10px;
  }
</style>

<script>

import axios from 'axios'

export default {
  name: 'CreateBook',
  data () {
    return {
      s_selected: [],
      u_selected: [],
      systems: [],
      users: [],
      soptions: [],
      uoptions: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/system/init`)
    .then(response => {
      this.systems = response.data
      // console.log(this.systems[1])
      // console.log(this.systems[1].companyName)
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
      this.soptions=holder;
      console.log(this.soptions)
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
      var holder = [this.users.length]
      var temp = {}
      console.log(this.users.length)
      for (var i = 0; i < this.users.length; i++) {
        temp["text"]=this.users[i]["username"]
        temp["value"]=this.users[i]["_id"]

        holder[i]=temp
        temp={}

        console.log("made it")
      }
      this.uoptions=holder;
      console.log(this.uoptions)
      // this.uoptions = temp
      
    })
    .catch(e => {
        console.log(e)
    })
    console.log(this.users)
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

