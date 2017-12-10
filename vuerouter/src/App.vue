<template>
<div>
<b-navbar type = "dark" class = "navbar navbar-inverse">
  <div>
      <img class="navbar-brand" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Hewlett_Packard_Enterprise_logo.svg/1000px-Hewlett_Packard_Enterprise_logo.svg.png">
  </div>
  <div class="navbar-header">
      <img class="navbar-brand" src="https://i.imgur.com/sM81cRp.png">
  </div>
  <div class = "info">
      <ul class="nav navbar-nav">
        <li><a>About</a></li>
        <li><a>Contact</a></li>
      </ul>
    </div>
</b-navbar>
<footer class="container-fluid text-center">
  <small>Copyright &copy 2017 by Selfie Sisters</small>
</footer>
<router-view/>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html {
    position: relative;
    min-height: 100%;
}

.info {
  left: 250px;
  position: absolute;
}
footer {
      background-color: #555;
      color: white;
      padding: 15px;
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
    }
.navbar {
    min-height:75px !important;
    background-color: #f1f1f1;
      border-color: #f1f1f1;
      height: 75px;
      margin-bottom: 0;
      border-radius: 0;
  }
  .navbar-header {
    left: 175px;
    position: absolute;
  }
    .navbar-brand {
    	height: 60px;
      align: left;
    }
.navbar-nav {
  display: inline !important;
}
a {
  color: #9d9d9d !important;
}
li {
  padding: 20px;
  display: inline;
}

ul.nav li:hover {
    cursor: pointer;
}
.btn-primary{
  background-color: #03BE74;
  border-color: #03BE74
}
.btn-primary:hover{
  background: #029C5F;
  border-color: #029C5F;
}
ul.nav a:hover { color: #03BE74 !important; }
</style>
