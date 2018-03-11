<template>
  <div id="app">
    <div id="app-head">
      <img src="./assets/logo.png" style="width: 200px"/>
      <h1>CERN Cloud</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /*background-color: #fff4c2;*/
}

  #app-head{
    display: inline-block;
    margin-top: 1%;
  }
</style>
