<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="100px">
     <Example msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    Example: () => import('./example/Example')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
