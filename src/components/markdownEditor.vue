<template>
  <div
    id="editor"
    :class="['editor', fullScreen && 'editor_fullscreen']"
    @keydown="tabDelete"
  >
    <div class="edit-toolbar">
      <ul class="edit-mode">
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
import "highlight.js/styles/solarized-light.css";
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  headerIds: true,
  headerPrefix: "m-editor",
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})
hljs.highlightCode = () => {
  // 自定义 highlightCode 方法，循环执行方法
  let blocks = document.querySelectorAll("code")
  let dom = Array.prototype.slice.call(blocks)
  dom.forEach(ele => {
    hljs.highlightBlock(ele)
  })
}
String.prototype.splice = function (index, str) {
  return `${this.slice(0, index)}${str}${this.slice(index)}`
}
export default {
  name: "simpleMEditor",
  data() {
    return {
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
      this.$nextTick(() => {
        hljs.highlightCode();
      });
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import './markdownEditor.scss';
</style>
