# simple-m-editor

> A markdown editor with Vue.js

![GitHub package.json version](https://img.shields.io/github/package-json/v/hellomrbigshot/simple-m-editor)
![GitHub](https://img.shields.io/github/license/hellomrbigshot/simple-m-editor)

## Install
```
yarn add simple-m-editor
```
### use npm
```
npm install --save simple-m-editor
```

## Usage with Vue.js

```
// you can add class "m-editor-preview" to your element to
// use the same style as the editor shows
<template>
<div>
  <m-editor
    v-model="text"
    :debounce="true"
    :debounce-wait="500"
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

| name       | type   | default     | description     |
| ---------- | -------| ----------- | --------------- |
| value      | String |             | value           |
| placeholder| String | ''     | placehoder      |
| mode       | String | live        | one of ['live', 'edit', 'preview']|
| full-screen | Boolean| false       | full screen or not |
| show-line-num| Boolean| true        | show side line number or not |
| theme      | String | light       | light or dark   |
| auto-scroll| Boolean| true        | auto sroll or not |
| debounce | Boolean | false | debounce render html when edit |
| debounce-wait | Number | 200 | debounce wait time |



### event

| event name | description | return value |
| -------  | ------ | -----------    |
| on-change | callback when editor is changed | Object: { content, htmlContent } |
| on-mode-change | callback when editor's mode is change | mode, one of ['live', 'edit', 'preview']; oldMode, one of ['live', 'edit', 'preview'] |
| on-full-screen-change | callback when editor's fullscreen change | fullscreen status, true or false |


## Licence

[MIT Licence](./LICENSE)
