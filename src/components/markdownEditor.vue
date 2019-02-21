<template>
  <div
    id="m-editor"
    :class="['m-editor', fullScreen && 'm-editor_fullscreen']"
    @keydown="tabDelete"
  >
    <div class="edit-toolbar">
      <ul class="edit-tools pull-left">
        <template v-for="(item, i) in config">
          <li  :key="i" v-if="item.showIcon">
            <a 
              :class="['iconfont', item.icon]"
              :title="item.title"
              @click="addContent(item.content)"
            ></a>
          </li>
        </template>
      </ul>
      <ul class="edit-mode pull-right">
        <li>
          <a
            :class="['iconfont', !fullScreen && 'icon-quanping' || 'icon-huanyuanhuabu']"
            :title="!fullScreen && '全屏' || '还原'"
            @click="fullScreen=!fullScreen"
          ></a>
        </li>
        <li>
          <a
            :class="['iconfont', 'icon-tianxie', mode === 'edit' && 'muted']"
            title="编辑"
            @click="mode='edit'"
          ></a>
        </li>
        <li>
          <a
            :class="['iconfont', 'icon-fenlan', mode === 'live' && 'muted']"
            title="分栏"
            @click="mode='live'"
          ></a>
        </li>
        <li>
          <a
            :class="['iconfont', 'icon-zitiyulan', mode === 'preview' && 'muted']"
            title="预览"
            @click="mode='preview'"
          ></a>
        </li>
      </ul>
    </div>
    <div :class="['edit-content']">
      <div class="edit-content-scroll">
        <transition v-show="mode!=='preview'">
          <div
            v-show="mode!=='preview'"
            :class="['m-editor-input', mode === 'edit' && 'edit-full']"
          >
            <textarea
              v-model="input"
              spellcheck="false"
              ref="mTextarea"
            ></textarea>
          </div>
        </transition>
        <transition v-show="mode!=='edit'">
          <div :class="['m-editor-preview', mode === 'preview' && 'edit-full']">
            <div v-html="compiledMarkdown"></div>
          </div>
        </transition>
      </div>

    </div>
  </div>
</template>
<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow.css";
import { config } from "./config.js"
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  headerIds: true,
  headerPrefix: "m-editor",
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  
})
// hljs.highlightCode = () => {
//   // 自定义 highlightCode 方法，循环执行方法
//   let blocks = document.querySelectorAll("code")
//   let dom = Array.prototype.slice.call(blocks)
//   dom.forEach(ele => {
//     hljs.highlightBlock(ele)
//   })
// }
String.prototype.splice = function (index, str) {
  return `${this.slice(0, index)}${str}${this.slice(index)}`
}
export default {
  name: "simpleMEditor",
  data() {
    return {
      config,
      input: this.value,
      mode: "live",
      fullScreen: false
    };
  },
  props: {
    value: {
      type: String,
      default: "### 用 markdown 写一篇文章"
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.input);
    }
  },
  watch: {
    input(val) {
      this.$emit("input", val);
      // this.$nextTick(() => {
      //   hljs.highlightCode();
      // });
    },
    value(val) {
      this.input = val;
    }
  },
  methods: {
    tabDelete(e) {
      // 自定义默认 tab 事件
      const TABKEY = 9;
      if (e.keyCode === TABKEY) {
        let pos = this.$refs["mTextarea"].selectionStart;
        if (pos >= 0) {
          this.input = this.input.splice(pos, "    ");
          this.$refs["mTextarea"].blur();
          setTimeout(() => {
            this.$refs["mTextarea"].selectionStart = pos + 4;
            this.$refs["mTextarea"].selectionEnd = pos + 4;
            this.$refs["mTextarea"].focus();
          });
        }
        if (e.preventDefault) {
          e.preventDefault();
        }
      }
    },
    addContent (content) {
      let pos = this.$refs["mTextarea"].selectionStart;
      if (pos >= 0) {
        this.input = this.input.splice(pos, content);
        this.$refs["mTextarea"].blur();
        setTimeout(() => {
          this.$refs["mTextarea"].selectionStart = pos + content.length;
          this.$refs["mTextarea"].selectionEnd = pos + content.length;
          this.$refs["mTextarea"].focus();
        });
      }
    }
  }
};
</script>
<style lang="scss">
@import './markdownEditor.scss';
@import './editorpreview.scss';
</style>