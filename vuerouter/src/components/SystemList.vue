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
  data () {
    return {
      systems: [{name: 'Dumb', age: 'ugh', type: 'linux'},
                {name: 'Dumb', age: 'ugh', type: 'linux'},
                {name: 'Dumb', age: 'ugh', type: 'linux'},
                {name: 'Dumb', age: 'ugh', type: 'linux'},
                {name: 'Dumb', age: 'ugh', type: 'linux'}
      ],
      user: 'Ryan'
    }
  },
  computed: {
        /*
        TODO: make backend to fetch systems data and user name
        axios.get('URL', param id?)
        .then(response => {
            this.systems = response.data
        })
        axios.get()
        .then(response => {
            this.user = response.data
        }) */
  }
}
