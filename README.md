# simple-m-editor

> A markdown editor with Vue.js

![GitHub package.json version](https://img.shields.io/github/package-json/v/hellomrbigshot/simple-m-editor)
![GitHub](https://img.shields.io/github/license/hellomrbigshot/simple-m-editor)

## Install

npm i -S simple-m-editor

## Usage with Vue.js

```
// you can add class "m-editor-preview" to your element to
// use the same style as the editor shows
<template>
<div>
  <m-editor
    v-model="text"
    @on-change="handleChange"
  />
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
| value      | String |             | value           |
| placeholder| String | 请输入……     | placehoder      |
| mode       | String | live        | one of ['live', 'edit', 'preview']|
| full-screen | Boolean| false       | full screen or not |
| show-line-num| Boolean| true        | show side line number or not |
| theme      | String | light       | light or dark   |
| auto-scroll| Boolean| true        | auto sroll or not |



### event

| name     | params | description    |
| -------  | ------ | -----------    |
| onChange | Object: { content, htmlContent } | change event |

## Licence

[MIT Licence](./LICENSE)
