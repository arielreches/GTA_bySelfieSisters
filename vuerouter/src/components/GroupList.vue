<template>
  <b-row>
    <b-col cols="12">
      <div style="padding-left:1%;padding-right:1%;padding-bottom:1%;padding-top:2%;">
        <h2>
          System Groups
        </h2>
        <b-btn v-b-toggle.createGroupForm variant="primary">Create Group</b-btn>
          <b-collapse id="createGroupForm" class="mt-2">
            <b-card>
                <b-form @submit="onSubmit">
                  <div>
                    <b-form-input v-model="group.name"
                                  type="text"
                                  placeholder="Group Name..."
                                  class = "groupNameInput"></b-form-input>
                  </div>
                <b-btn v-b-toggle.collapse1 class="addButton">Add Systems</b-btn>
                <b-collapse id="collapse1" class="mt-2">
                  <b-card>
                    <form id="SystemsInput" style="padding-right:75%;">
                      <b-form-input v-model="SystemSearch" type = "text" placeholder="Search For Systems"></b-form-input>
                    </form>  
                    <b-form-checkbox-group v-model="group.systemsIn" name="systemselect" :options="filteredSystems"></b-form-checkbox-group>
                  </b-card>
                </b-collapse><br>
                  <b-btn v-b-toggle.collapse2 class="addButton">Add Users</b-btn>
                  <b-collapse id="collapse2" class="mt-2">
                    <b-card>
                      <form id="UsersInput" style="padding-right:75%;">
                        <b-form-input v-model="UserSearch" type = "text" placeholder="Search For Users"></b-form-input>
                      </form>
                      <b-form-checkbox-group v-model="group.usersIn" name="userselect" :options="filteredUsers"></b-form-checkbox-group>
                    </b-card>
                  </b-collapse><br>
                  <b-button type="submit" variant="primary">Create</b-button>
                </b-form>
            </b-card>
          </b-collapse>
        </div>
        <div style="padding-bottom:1%;padding-left:1%;padding-right:80%;">
          <b-form-input v-model="searchString" type = "text" placeholder="Search groups..."></b-form-input>
        </div>
        <div style="padding-bottom:5%;">
          <b-table hover :items="filteredArticles" :fields="fields">

            <template slot="actions" scope="row">
              <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
            </template>

            <template slot="vsystems" scope="row">
              <b-btn size="sm" @click.stop="viewSystems(row.item)">View Systems</b-btn>
            </template>

          </b-table>
        </div>


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
import router from '../router'

var groups= []

export default {
  name: 'GroupList',
  data () {
    return {
      newGroups: [],
      systems: [],
      users: [],
      soptions: [],
      uoptions: [],
      group: {},
      groups: [],
      curruser: {},
      fields: {
          name: {label: 'Group Name', sortable: true, 'class': 'text-center'},
          groupCreator: {label: 'Creator', sortable: true, 'class': 'text-center'},
          systemNumber: {label: 'System Number', sortable:true, 'class': 'text-center'},
          vsystems: {label: 'Systems', 'class': 'text-center'},
          actions: {label: 'Action', 'class': 'text-center'}
          //usersIn: {label: 'Members', sortable: true},
         // systemsIn: {label: 'Systems', sortable: true}
        },
      SystemSearch: '',
      UserSearch:'',
      searchString: '',
      groups: groups
    }
  },
  created () {
    axios.get(`/user`)
    .then(response => {
      this.users = response.data
      var holder = []
      var temp = {}
      for (var i = 0; i < this.users.length; i++) {

        temp["text"]=this.users[i]["username"]
        temp["value"]=this.users[i]["_id"]

        holder[i]=temp
        temp={}

      }
      this.uoptions=holder
    })
    .catch(e => {
        console.log(e)
    })
    console.log(this.users)
    axios.get(`/user/curr`)
      .then(response => {
        console.log(response.data)
        this.curruser = response.data
         axios.get(`/user/` + this.curruser._id + '/groups')
             .then(response => {
               console.log('curruser populate')
               console.log(response)
               this.groups = response.data.Group
               console.log(this.groups)           
             })
             .catch(e => {
               this.errors.push(e)
            })
    axios.get('/user/' + this.curruser._id + `/systemsall`)
    .then(response => {
      console.log(response)
       var uniq = Array.from(new Set(response.data))
      axios.post(`/system/many` , uniq)
          .then(response => {
            console.log(response)
            this.systems = response.data
            console.log(this.systems)
            var holder = [this.systems.length]
            var temp = {}
            for (var i = 0; i < this.systems.length; i++) {

              temp["text"]=this.systems[i]["companyName"]
              temp["value"]=this.systems[i]["_id"]

              holder[i]=temp
              temp={}

            }
            this.soptions=holder;
                })
          .catch(e => {
            this.errors.push(e)
          })
    })
    .catch(e => {
      console.log(e);
    })  
      })
      .catch(e => {
        this.errors.push(e)
      })
    console.log(this.users)
  },
  computed: {
      getGroups: function () {
        var holder = this.groups
        for(var i = 0 ; i < this.groups.length ; i++){
          for( var j = 0 ; j < this.uoptions.length ; j++){
            if(holder[i]['groupCreator']==this.uoptions[j]['value']){
              holder[i]['groupCreator']=this.uoptions[j]['text']
            }
          }
          holder[i]['systemNumber']=this.groups[i]['systemsIn'].length
        }
        return holder
      },
      filteredSystems: function () {
        var articles_array = this.soptions;
        var searchString = this.SystemSearch;

        if(!searchString){
            return articles_array;
        }
        else {
            searchString = searchString.trim().toLowerCase();
            articles_array = articles_array.filter(
                function (item) {
                    if (item.text.toLowerCase().indexOf(searchString) !== -1 ) {
                       return item;
                    }
                }
            )
        }
        // Return an array with the filtered data.
        return articles_array;
      },
      filteredUsers: function () {
        var articles_array = this.uoptions;
        var searchString = this.UserSearch;

        for(var i = 0 ; i < this.uoptions.length ; i++){
          if(this.uoptions[i]["text"]==null){
            console.log(i)
            articles_array.splice(i,1);
          }
        }

        // articles_array.splice(7, 1);

        if(!searchString){
            return articles_array;
        }
        else {
            searchString = searchString.trim().toLowerCase();
            // console.log(articles_array)
            articles_array = articles_array.filter(
                function (item) {
                    if (item.text.toLowerCase().indexOf(searchString) !== -1 ) {
                       return item;
                    }
                }
            )
        }
        // Return an array with the filtered data.
        return articles_array;
      },
      filteredArticles: function () {
        var articles_array = this.getGroups;
        var searchString = this.searchString;

        if(!searchString){
            return articles_array;
        }
        else {
            searchString = searchString.trim().toLowerCase();
            articles_array = articles_array.filter(
                function (item) {
                  console.log("Made it")
                    if (item.name.toLowerCase().indexOf(searchString) !== -1 || 
                    item.groupCreator.toLowerCase().indexOf(searchString) !== -1) {
                       return item;
                    }
                }
            )
        }
        // Return an array with the filtered data.
        return articles_array;
    }
    },
  methods: {

    onSubmit (evt) {
      evt.preventDefault()
      this.group.groupCreator = this.curruser._id  
      var id   
      axios.post(`/group`, this.group)
      .then(response => {
        console.log('added group')
        id = response.data._id
        console.log(id)
        for (var i = 0; i < this.group.systemsIn.length; i++){
          var crrsys = this.group.systemsIn[i]
          console.log(crrsys)
          axios.get(`/system/` + crrsys)
          .then(response => {
            console.log(response.data)
            var sys = response.data
            console.log('made it to systems')
            sys.Group.push(id)
            console.log(sys)
            axios.put(`/system/` + sys._id, sys)
            .then(response => {
              console.log(response)
              console.log('updated system')
            })
            .catch(e => {
              this.errors.push(e)
            })  
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      for (var i = 0; i < this.group.systemsIn.length; i++){
          var crrusr = this.group.usersIn[i]
          console.log(crrusr)
          axios.get(`/user/` + crrusr)
          .then(response => {
            console.log(response.data)
            var usr = response.data
            console.log('made it to users')
            usr.Group.push(id)
            console.log(usr)
            axios.put(`/user/` + usr._id, usr)
            .then(response => {
              console.log(response)
              console.log('updated user')
            })
            .catch(e => {
              this.errors.push(e)
            })  
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      })
      .catch(e => {
        this.errors.push(e)
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    details (group){
      console.log(group._id)
      this.$router.push({
        name: 'ShowGroup',
        params: { id: group._id }
      })
    },
    viewSystems (group){
      console.log(group._id)
      this.$router.push({
        name: 'SystemList',
        params: { id: group._id }
      })
    },
    makeActive: function (item) {
          this.tagName = item;
          var form = document.getElementById("inputForm");
          form.reset();
          this.searchString='';
      }
  }
}
</script>

