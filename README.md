# simple-m-editor
一个基于 Vue.js 的简单的 markdown 编辑器。
### 安装
npm i -S simple-m-editor
### 使用
```
<template>
<div>
  <m-editor v-model="text"></m-editor>
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
  }
}
```
### 预览
[点我预览](https://hellomrbigshot.github.io/simple-m-editor/dist/index.html)
