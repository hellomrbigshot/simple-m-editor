<template>
  <div class="hello">
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

<script>
import text from './example.md'
export default {
  name: 'Example',
  components: {
    editor: () => import('../Editor/index')
  },
  data () {
    return {
      text,
      theme: 'light'
    }
  },
  mounted () {
    setTimeout(() => {
      this.text = text
    }, 1000)
  },
  methods: {
    change (answer) {
      console.log(answer)
    },
    handleFullScreenChange (fullScreen) {
      console.log('fullScreen', fullScreen)
    },
    handleModeChange (mode, oldMode) {
      console.log('mode', mode, 'oldMode', oldMode)
    },
    handleThemeChange () {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
}
</script>
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
.hello {
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
</style>
