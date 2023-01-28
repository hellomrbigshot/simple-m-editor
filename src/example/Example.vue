<script setup>
import { ref } from 'vue'
import text from './example.md?raw'
import { version } from '../../package.json'
import Editor from '../Editor/index.vue'
const theme = ref('light')
const change = (answer) => {
  console.log(answer)
}
const handleFullScreenChange = (fullScreen) => {
  console.log('fullScreen', fullScreen)
}
const handleModeChange = (mode, oldMode) => {
  console.log('mode', mode, 'oldMode', oldMode)
}
const handleThemeChange = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
<template>
  <div class="wrapper">
    <div class="comp-name">simple-m-editor@{{ version }}</div>
    <div class="button" @click="handleThemeChange">{{ theme === 'light' ? '暗黑模式' : '普通模式' }}</div>
    <editor
      v-model="text"
      :theme="theme"
      placeholder="请输入"
      :debounce="true"
      :debounce-wait="300"
      @on-change="change"
      @on-mode-change="handleModeChange"
      @on-full-screen-change="handleFullScreenChange"
    />
  </div>
</template>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.wrapper {
  width: 80%;
  margin: 0 auto;
}
.button:hover {
  cursor: pointer;
}
.button {
  width: 100px;
  height: 30px;
  text-align: center;
  box-shadow: 0 0 2px #666;
  border-radius: 3px;
  line-height: 30px;
  margin: 0 auto 10px;
}
.comp-name {
  margin-bottom: 20px;
  font-weight: 500;
  color: #64b587;
}
</style>
