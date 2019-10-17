# simple-m-editor

A simple markdown editor with Vue.js

## Install

npm i -S simple-m-editor

## Usage with Vue.js

```
// you can add class "m-editor-preview" to your element to
// use the same style as the editor shows
<template>
<div>
  <m-editor v-model="text" @on-change="handleChange"/>
  <div class="m-editor-preview" v-html="markdownContent"></div>
</div>
</template>
import mEditor from 'simple-m-editor'
import 'simple-m-editor/dist/simple-m-editor.css'
export default {
  component: {
    mEditor
  },
  data () {
    return {
      text: '',
      markdownContent: ''
    }
  },
  methods: {
    handleChange(data) {
      this.markdownContent = data.htmlContent
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
