# simple-m-editor

> A markdown editor with Vue@2.7

If you want to use it with the eaiser vue version, you can use simple-m-editor@0.4.6

![GitHub package.json version](https://img.shields.io/github/package-json/v/hellomrbigshot/simple-m-editor)
![GitHub](https://img.shields.io/github/license/hellomrbigshot/simple-m-editor)

## Install

### use npm
```
npm install --save simple-m-editor
```
### use yarn
```
yarn add simple-m-editor
```
### use pnpm
```
pnpm i simple-m-editor
```

## Usage with Vue.js

```
// you can add class "m-editor-preview" to your element to
// use the same style as the editor shows
<script setup>
import mEditor from 'simple-m-editor'
import 'simple-m-editor/dist/simple-m-editor.css'
const text = ref('')
const markdownContent = ref('')
const handleChange = (data) => {
  markdownContent.value = data.htmlContent
}
</script>
<template>
  <div>
    <m-editor
      v-model="text"
      :debounce-render="true"
      :debounce-render-wait="500"
      @on-change="handleChange"
    />
    <div class="m-editor-preview" v-html="markdownContent"></div>
  </div>
</template>
```

## Preview

[address](https://hellomrbigshot.github.io/simple-m-editor/index.html)

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
| debounce-render | Boolean | false | debounce render html when edit |
| debounce-render-wait | Number | 200 | debounce wait time |



### event

| event name | description | return value |
| -------  | ------ | -----------    |
| on-change | callback when editor is changed | Object: { content, htmlContent } |
| on-mode-change | callback when editor's mode is change | mode, one of ['live', 'edit', 'preview']; oldMode, one of ['live', 'edit', 'preview'] |
| on-full-screen-change | callback when editor's fullscreen change | fullscreen status, true or false |


## Licence

[MIT Licence](./LICENSE)
