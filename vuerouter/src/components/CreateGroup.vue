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
                  <ul id="example-1">
                    <li v-for="s in system">
                      <b-form-checkbox id="checkbox1"
                                       v-model="status"
                                       value="accepted"
                                       unchecked-value="not_accepted">
                        {{ s.companyName }}
                      </b-form-checkbox>
                    </li>
                  </ul>
                </b-card>
              </b-collapse><br>

                <b-btn v-b-toggle.collapse2 class="addButton">Add Users</b-btn>
                <b-collapse id="collapse2" class="mt-2">
                  <b-card>
                    <ul id="example-2">
                      <li v-for="u in user">
                        <b-form-checkbox id="checkbox2"
                                         v-model="status"
                                         value="accepted"
                                         unchecked-value="not_accepted">
                          {{ u.username }}
                        </b-form-checkbox>
                      </li>
                    </ul>
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
    })
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

