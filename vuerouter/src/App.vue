<template>
  <b-container>
    <b-navbar variant='dark' type='dark'>
      <img src='../src/assets/sslogo.png' class='d-inline-block align-top' alt='GTA' height='20px' width='30px'>
      <b-navbar-brand tag='h1' to='/systems' right >GTA By Selfie Sisters</b-navbar-brand>
    </b-navbar>
    <router-view/>
  </b-container>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}
b-navbar {
  width: 100%;
  margin: 0px;
}
</style>
