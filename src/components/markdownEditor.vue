<template>
  <div
    id="m-editor"
    :class="['m-editor', fullScreen && 'm-editor_fullscreen']"
    @keydown="tabDelete"
  >
    <div class="edit-toolbar">
      <ul class="edit-tools pull-left">
        <template v-for="(item, i) in config">
          <li  :key="i" v-if="item.showIcon && i < iconLength">
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
import marked from 'marked';
import { config } from './config.js';
import '../assets/css/icon.css';
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
  headerPrefix: 'm-editor',
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

String.prototype.splice = function (index, str) {
  return `${this.slice(0, index)}${str}${this.slice(index)}`
}

let script = document.createElement('script');
script.type = 'text/javascript';  
script.src = 'https://cdn.bootcss.com/highlight.js/9.14.2/highlight.min.js';
document.head.appendChild(script);

export default {
  name: 'simpleMEditor',
  data() {
    return {
      config,
      input: this.value,
      mode: 'live',
      fullScreen: false,
      iconLength: config.length
    };
  },
  props: {
    value: {
      type: String,
      default: '### 用 markdown 写一篇文章'
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.input);
    }
  },
  mounted () {
    this.resize();
    window.onresize = this.throttle(this.resize, 150);
  },
  watch: {
    input(val) {
      this.$emit('input', val);
      this.$emit('on-change', {content: val, htmlContent: this.compiledMarkdown});
    },
    value(val) {
      this.input = val;
    },
    fullScreen() {
      setTimeout(() => {
        this.resize();
      })
    }
  },
  methods: {
    tabDelete(e) {
      // 自定义默认 tab 事件
      const TABKEY = 9;
      if (e.keyCode === TABKEY) {
        this.addContent('    ');
        if (e.preventDefault) {
          e.preventDefault();
        }
      }
    },
    addContent (content) {
      let pos = this.$refs['mTextarea'].selectionStart;
      if (pos >= 0) {
        this.input = this.input.splice(pos, content);
        this.$refs['mTextarea'].blur();
        setTimeout(() => {
          this.$refs['mTextarea'].selectionStart = pos + content.length;
          this.$refs['mTextarea'].selectionEnd = pos + content.length;
          this.$refs['mTextarea'].focus();
        });
      }
    },
    resize () {
      let width = document.querySelector('#m-editor').clientWidth;
      let editTools = document.querySelector('.edit-tools');
      if (width > 780) {
        editTools.style.width = '600px';
      } else if (680 < width) {
        editTools.style.width = '480px';
      } else if (640 < width) {
        editTools.style.width = '400px';
      } else if (500 < width) {
        editTools.style.width = '320px';
      } else if (width < 500) {
        editTools.style.width = '0';
      }
    },
    debunce (fun, wait) {
      let time;
      return function () {
        const args = arguments;
        clearTimeout(time);
        time = setTimeout (() => {
          fun.apply(this, args);
        }, wait)
      }
    },
    throttle (fun, wait) { // 节流函数
      let previous = 0;
      return function () {
        let args = arguments;
        let now = +new Date();
        if (now - previous > wait) {
          fun.apply(this, arguments);
          previous = now;
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import './markdownEditor.scss';
@import './editorpreview.scss';
@import './tomorrow.css';
</style>