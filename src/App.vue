<script setup>
import Example from './example/Example.vue'
import Logo from './assets/logo.png'
</script>
<template>
  <div id="app">
    <img alt="Vue logo" :src="Logo" width="100px">
     <Example msg="Welcome to Your Vue.js App"/>
  </div>
</template>

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
