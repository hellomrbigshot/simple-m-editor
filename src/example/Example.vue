<template>
  <div class="hello">
    <editor
      v-model="text"
      theme="dark"
      @on-change="change"
    />
  </div>
</template>

<script>
import text from './example.md';
export default {
  name: 'Example',
  components: {
    editor: () => import('../Editor/index')
  },
  data () {
    return {
      text
    }
  },
  methods: {
    change (answer) {
      console.log(answer)
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
</style>
