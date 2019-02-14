<template>
  <div class="hello">
    <editor v-model="text"></editor>
  </div>
</template>

<script>
import mEditor from './markdownEditor'
export default {
  name: 'HelloWorld',
  components: {
    editor: mEditor
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
