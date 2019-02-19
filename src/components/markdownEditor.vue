<template>
  <div
    id="editor"
    :class="['editor', fullScreen && 'editor_fullscreen']"
    @keydown="tabDelete"
  >
    <div class="edit-toolbar">
      <ul class="edit-mode pull-left">
        <li v-for="(item, i) in config" :key="i" v-if="item.showIcon">
          <a 
            :class="[item.icon]"
            :title="item.title"
            @click="addContent(item.content)"
          ></a>
        </li>
      </ul>
      <ul class="edit-mode pull-right">
        <li>
          <a
            :class="[fullScreen && 'edit-menu__unzen', !fullScreen && 'edit-menu__zen']"
            title="全屏"
            @click="fullScreen=!fullScreen"
          ></a>
        </li>
        <li>
          <a
            :class="['edit-menu__edit', mode === 'edit' && 'muted']"
            title="编辑"
            @click="mode='edit'"
          ></a>
        </li>
        <li>
          <a
            :class="['edit-menu__live',  mode === 'live' && 'muted']"
            title="实时"
            @click="mode='live'"
          ></a>
        </li>
        <li>
          <a
            :class="['edit-menu__preview',  mode === 'preview' && 'muted']"
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
            :class="['editor-input', mode === 'edit' && 'edit-full']"
          >
            <textarea
              v-model="input"
              spellcheck="false"
              ref="mTextarea"
            ></textarea>
          </div>
        </transition>
        <transition v-show="mode!=='edit'">
          <div :class="['editor-preview', mode === 'preview' && 'edit-full']">
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
<style lang="scss" src="./markdownEditor.scss"></style>
<style lang="scss">
.editor-preview {
  background: #000 !important;
  blockquote {
    border-left: 2px solid #009a61;
    color: #555;
    font-size: 1em;
    padding: 0.5em 1em;
    margin: 1.5em 0;
  }
  pre {
    background: #f0f0f0;
    margin: 1em 0;
    padding: 1em;
    code {
      // padding: 0.5em;
      font-family: Consolas, Monaco, monospace;
    }
  }
  table {
    width: 100%;
    border: 1px solid #dddee1;
    border-bottom: 0;
    background: #fff;
    border-spacing: 0;
    border-collapse: collapse;
    margin: 1.5em 0;
    tr {
      td, th {
        padding: 0 0.5em;
        line-height: 40px;
        color: #333;
        cursor: pointer;
        border: 1px solid #dddee1;
      }
      &:nth-of-type(2n) td {
        background: #f8f8f9;
      }
    }
  }
  ul, ol {
    margin: 1.5em 0;
    padding: 0 2em;
    // list-style: circle;
  }
  ol {
    padding: 0 2em;
    list-style: decimal;
  }
  
}
</style>