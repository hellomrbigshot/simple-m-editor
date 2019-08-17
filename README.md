# simple-m-editor

A simple markdown editor with Vue.js

## Install

npm i -S simple-m-editor

## Usage with Vue.js

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

## Preview

[address](https://hellomrbigshot.github.io/simple-m-editor/dist/index.html)

## Api

### props

| name       | type   | defautl     | description     |
| ---------- | -------| ----------- | --------------- |
| placeholder| String | 请输入……     | placehoder      |
| mode       | String | live        | one of ['live', 'edit', 'preview']|


### event

| name     | params | description    |
| -------  | ------ | -----------    |
| onChange | Object: { content, htmlContent } | change event |

## Licence

[MIT Licence](./LICENSE)
