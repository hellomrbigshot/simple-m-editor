<template>
  <ul class="editor-content-edit-column">
    <li v-for="i of length" :key="i">{{ i }}</li>
  </ul>
</template>
<script>
export default {
  props: {
    length: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss">
@import "../assets/css/column.scss"
</style>
