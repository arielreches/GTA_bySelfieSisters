<template>
    <div>
        <h1> Hello, {{ user }}!</h1>
        <b-table striped hover :items='systems'></b-table>
    </div>
</template>

<style>
</style>

<script>
export default {
  name: 'SystemList',
  data () {
    return {
      fields: {
         companyName: { label: 'Company Name', sortable:true, 'class': 'text-center'},
         systemName: { label: 'System Name', sortable:true},
         model: {label: 'Model', sortable:true}  
      }, 
      systems: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/system`)
    .then(response => {
      this.sytems = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
}
