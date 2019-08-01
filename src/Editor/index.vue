<template>
  <div id="m-editor" ref="mEditor" :class="['m-editor', fullScreen && 'm-editor_fullscreen']" @keydown="tabDelete">
    <div class="edit-toolbar">
      <ul class="edit-tools pull-left" ref="editTools">
        <template v-for="(item, i) in config">
          <li :key="i" v-if="item.showIcon && i < iconLength">
            <a :class="['iconfont', item.icon]" :title="item.title" @click="addContent(item.content)"></a>
          </li>
        </template>
      </ul>
      <ul class="edit-mode pull-right">
        <li>
          <a :class="['iconfont', !fullScreen && 'icon-quanping' || 'icon-huanyuanhuabu']" :title="!fullScreen && '全屏' || '还原'" @click="fullScreen=!fullScreen"></a>
        </li>
        <li>
          <a :class="['iconfont', 'icon-tianxie', mode === 'edit' && 'muted']" title="编辑" @click="mode='edit'"></a>
        </li>
        <li>
          <a :class="['iconfont', 'icon-fenlan', mode === 'live' && 'muted']" title="分栏" @click="mode='live'"></a>
        </li>
        <li>
          <a :class="['iconfont', 'icon-zitiyulan', mode === 'preview' && 'muted']" title="预览" @click="mode='preview'"></a>
        </li>
      </ul>
    </div>
    <div :class="['edit-content']">
      <div class="edit-content-scroll">
        <template v-show="mode!=='preview'">
          <div v-show="mode!=='preview'" :class="['m-editor-input', mode === 'edit' && 'edit-full']" ref="inputWrapper">
            <textarea v-model="input" ref="mTextarea" />
          </div>
        </template>
        <template v-show="mode!=='edit'">
          <div :class="['m-editor-preview', mode === 'preview' && 'edit-full']">
            <div ref="previewContent" id="m-editor-preview" v-html="compiledMarkdown"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked';
import { config } from '../assets/js/config';
import hljs from '../assets/js/hljs';
import '../assets/css/icon.css';
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code) => {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  headerIds: true,
  // headerPrefix: 'm-editor',
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});
String.prototype.splice = function (index, str) {
  return `${this.slice(0, index)}${str}${this.slice(index)}`;
};

export default {
  name: 'SimpleMEditor',
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
  mounted() {
    this.resize();
    // window.onresize = this.throttle(this.resize, 150, this);
  },
  watch: {
    input(val) {
      this.$emit('input', val);
      this.$emit('on-change', {
        content: val,
        htmlContent: this.compiledMarkdown
      });
    },
    value(val) {
      this.input = val;
    },
    fullScreen() {
      setTimeout(() => {
        this.resize();
      });
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
    addContent(content) { // 移动光标到添加文本的最后
      let pos = this.$refs['mTextarea'].selectionStart;
      if (pos > -1) {
        this.input = this.input.splice(pos, content);
        this.$refs['mTextarea'].blur();
        setTimeout(() => {
          this.$refs['mTextarea'].selectionStart = pos + content.length;
          this.$refs['mTextarea'].selectionEnd = pos + content.length;
          this.$refs['mTextarea'].focus();
        });
      }
    },
    resize() {
      let width = this.$refs['mEditor'].clientWidth;
      let editTools = this.$refs['editTools'];
      console.log(width);
      if (width > 780) {
        editTools.style.width = '600px';
      } else if (680 < width) {
        editTools.style.width = '480px';
      } else if (640 < width) {
        editTools.style.width = '400px';
      } else if (500 < width) {
        editTools.style.width = '320px';
        this.mode = 'live';
      } else if (width < 500) {
        editTools.style.width = '0';
        this.mode = 'edit';
      }
    },
    debunce(fun, wait, ctx) {
      let time;
      return () => {
        const args = arguments;
        clearTimeout(time);
        time = setTimeout(() => {
          fun.apply(ctx, args);
        }, wait);
      };
    },
    throttle(fun, wait, ctx) {
      // 节流函数
      let previous = 0;
      return () => {
        let args = arguments;
        let now = +new Date();
        if (now - previous > wait) {
          fun.apply(ctx, arguments);
          previous = now;
        }
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/editorText.scss";
@import "../assets/css/editorPreview.scss";
</style>