<template>
  <div id="m-editor" ref="mEditor" :class="['editor', fullScreen && 'editor-fullscreen']" @keydown="tabDelete">
    <div class="editor-toolbar">
      <ul class="editor-toolbar-tools" ref="editTools">
        <template v-for="(item, i) in config">
          <li :key="i" v-if="item.showIcon && i < iconLength">
            <a :class="['iconfont', item.icon]" :title="item.title" @click="addContent(item.content)" />
          </li>
        </template>
      </ul>
      <ul class="editor-toolbar-mode">
        <li>
          <a :class="['iconfont', !fullScreen && 'icon-quanping' || 'icon-huanyuanhuabu']" :title="!fullScreen && '全屏' || '还原'" @click="fullScreen = !fullScreen" />
        </li>
        <li v-for="(mode, i) in modeConfig" :key="i">
          <a :class="['iconfont', mode.icon, editMode === mode.mode && 'muted']" @click="handleModeEdit(mode.mode)" />
        </li>
      </ul>
    </div>
    <div class="editor-content">
      <div ref="editContentWrapper" :class="['editor-content-edit', editMode === 'edit' && 'active', editMode === 'preview' && 'inactive']" @scroll.native="handleScroll">
        <div class="editor-content-edit-block" ref="editContent" @mouseover="handleMouseOver('edit')">
          <ul class="editor-content-edit-column">
            <li v-for="i of columnLength" :key="i">{{ i }}</li>
          </ul>
          <div class="editor-content-edit-input">
            <div ref="inputPre">{{ input.replace(/\n$/, '\n ') }}</div>
            <textarea v-model="input" :placeholder="placeholder" ref="mTextarea" />
            </div>
        </div>
      </div>
      <div ref="previewContentWrapper" @mouseover="handleMouseOver('preview')" :class="['editor-content-preview', editMode === 'preview' && 'active', editMode === 'edit' && 'inactive']">
        <div ref="previewContent" class="m-editor-preview" v-html="compiledMarkdown" />
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked';
import { config } from '../assets/js/config';
import hljs from '../assets/js/hljs';
import '../assets/css/icon.css';
import { setTimeout } from 'timers';
const modeConfig = [
  {
    mode: 'edit',
    title: '编辑',
    icon: 'icon-tianxie'
  },
  {
    mode: 'live',
    title: '分栏',
    icon: 'icon-fenlan'
  },
  {
    mode: 'preview',
    title: '预览',
    icon: 'icon-zitiyulan'
  }
]
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
      modeConfig,
      input: this.value,
      editMode: this.mode,
      fullScreen: false,
      iconLength: config.length,
      resizeEvent: null,
      scrollEvent: null,
      columnLength: 1,
      editContentWrapper: null,
      previewContentWrapper: null,
      scrollType: null
    };
  },
  props: {
    value: {
      type: String,
      default: '### 用 markdown 写一篇文章'
    },
    mode: {
      default: 'live',
      type: String,
      validator: (value) => {
        return ['live', 'preview', 'edit'].indexOf(value) !== -1
      }
    },
    placeholder: {
      default: '请输入……',
      type: String
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.input);
    }
  },
  mounted() {
    this.resizeEvent = this.throttle(this.handleResize, 150, this);
    // this.scrollEvent = this.throttle(this.handleScroll, 50, this);
    this.editContentWrapper = this.$refs['editContentWrapper'];
    this.previewContentWrapper = this.$refs['previewContentWrapper'];
    window.addEventListener('resize', this.resizeEvent);
    this.editContentWrapper.addEventListener('scroll', this.handleScroll, true);
    this.previewContentWrapper.addEventListener('scroll', this.handleScroll, true);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEvent);
    this.editContentWrapper.removeEventListener('scroll', this.handleScroll);
    this.previewContentWrapper.removeEventListener('scroll', this.handleScroll);
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
      this.handleColumnChange();
    },
    fullScreen() {
      this.$nextTick(() => {
        this.handleResize()
      })
    }
  },
  methods: {
    tabDelete(e) { // 自定义默认 tab 事件
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
    handleResize() { // resize
      let width = this.$refs['mEditor'].clientWidth;
      if (width > 780) {
        this.iconLength = this.config.length;
      } else if (680 < width) {
        this.iconLength = this.config.length - 3;
      } else if (640 < width) {
        this.iconLength = this.config.length - 6;
      } else if (500 < width) {
        this.iconLength = this.config.length - 9;
      } else if (width < 500) {
        this.iconLength = 0;
        this.editMode = 'edit';
      }
      this.handleColumnChange();
    },
    throttle(fun, wait, ctx) { // 节流函数
      let previous = 0;
      return () => {
        let now = +new Date();
        if (now - previous > wait) {
          fun.apply(ctx, arguments);
          previous = now;
        }
      };
    },
    handleColumnChange() {
      if (this.mode === 'preview') return false;
      this.$nextTick(() => {
        this.columnLength = Math.max(this.input.split('\n').length, (this.$refs['inputPre'].scrollHeight - 20) / 30);
      })
    },
    handleMouseOver(type) {
      this.scrollType = type;
    },
    handleScroll() { // 滚动事件
      const editContentWrapper = this.$refs['editContentWrapper'];
      const previewContentWrapper = this.$refs['previewContentWrapper'];
      const editScroll = editContentWrapper.scrollTop;
      const previewScroll = previewContentWrapper.scrollTop;
      const editScrollMax = editContentWrapper.scrollHeight - editContentWrapper.offsetHeight;
      const previewScrollMax = previewContentWrapper.scrollHeight - previewContentWrapper.offsetHeight;
      if (this.scrollType === 'edit') {
        previewContentWrapper.scrollTop = previewScrollMax * (editScroll / editScrollMax);
      } else if (this.scrollType === 'preview') {
        editContentWrapper.scrollTop = editScrollMax * (previewScroll / previewScrollMax);
      }
    },
    handleModeEdit(mode) {
      this.editMode = mode;
      setTimeout(() => { // mode 改变后有 .2s 的动画，计算行数需要添加延时
        this.handleColumnChange();
      }, 200)
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/editor.scss";
@import "../assets/css/preview.scss";
</style>
