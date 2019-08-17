# simple-m-editor

A simple markdown editor with Vue.js

### Install

npm i -S simple-m-editor

### Usage with Vue.js

```
<template>
<div>
  <m-editor v-model="text" @on-change="handleChange"></m-editor>
</div>
</template>
import mEditor from 'simple-m-editor'
export default {
  component: {
    mEditor
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    handleChange(data) {
      console.log(data)
    }
  }
}
```

### preview

[address](https://hellomrbigshot.github.io/simple-m-editor/dist/index.html)
