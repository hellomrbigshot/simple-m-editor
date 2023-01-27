<template>
  <div
    id="m-editor"
    ref="mEditor"
    :class="[
      'editor',
      `${theme}-editor`,
      editFullScreen && 'editor-editFullScreen'
    ]"
    @keydown="handleKeyPress"
  >
    <tool-bar
      :fullScreen="editFullScreen"
      :mode="editMode"
      :config="config"
      :icon-length="iconLength"
      @full-screen-change="handleFullScreenChange"
      @mode-change="handleModeEdit"
      @add-content="addContent"
    />
    <div class="editor-content">
      <div
        ref="editContentWrapper"
        :class="[
          'editor-content-edit',
          editMode === 'edit' && 'active',
          editMode === 'preview' && 'inactive'
        ]"
        @scroll="handleScroll"
      >
        <div
          ref="editContent"
          class="editor-content-edit-block"
          @mouseover="handleMouseOver('edit')"
        >
          <tool-column
            v-if="showLineNum"
            :length="columnLength"
          />
          <div class="editor-content-edit-input">
            <div ref="inputPre">{{ input.replace(/\n$/, '\n ') }}</div>
              <textarea
                v-model="input"
                ref="mTextarea"
                :placeholder="placeholder"
              />
            </div>
        </div>
      </div>
      <div
        ref="previewContentWrapper"
        :class="[
          'editor-content-preview',
          editMode === 'preview' && 'active',
          editMode === 'edit' && 'inactive'
        ]"
        @mouseover="handleMouseOver('preview')"
      >
        <div
          ref="previewContent"
          class="m-editor-preview"
          v-html="markedHtml"
        />
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import { config } from '../assets/js/config'
import hljs from '../assets/js/hljs'
import '../assets/css/icon.css'
import ToolBar from '../components/ToolBar.vue'
import ToolColumn from '../components/ToolColumn.vue'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'


marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => {
    return hljs.highlightAuto(code).value
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
})

export default {
  name: 'SimpleMEditor',
  components: {
    ToolBar,
    ToolColumn
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    mode: {
      default: 'live',
      type: String,
      validator: (value) => {
        return ['live', 'preview', 'edit'].indexOf(value) !== -1
      }
    },
    placeholder: {
      default: '',
      type: String
    },
    fullScreen: {
      default: false,
      type: Boolean
    },
    showLineNum: {
      default: true,
      type: Boolean
    },
    autoScroll: {
      default: true,
      type: Boolean
    },
    theme: {
      default: 'light',
      type: String,
      validator: (value) => {
        return ['light', 'dark'].indexOf(value) !== -1
      }
    },
    debounceRender: {
      type: Boolean,
      default: false
    },
    debounceRenderWait: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      config,
      input: this.value,
      editMode: this.mode,
      editFullScreen: this.fullScreen,
      iconLength: config.length,
      resizeEvent: null,
      columnLength: 1,
      editContentWrapper: null,
      previewContentWrapper: null,
      scrollType: null,
      markedHtml: '',
      debounceMarked: debounce(text => {
        this.$emit('input', text)
        this.$emit('on-change', {
          content: text,
          htmlContent: marked(text)
        })
        this.markedHtml = marked(text)
      }, this.debounceRenderWait)
    } 
  },
  mounted () {
    this.resizeEvent = throttle(this.handleResize, 150, this)
    this.editContentWrapper = this.$refs.editContentWrapper
    this.previewContentWrapper = this.$refs.previewContentWrapper
    window.addEventListener('resize', this.resizeEvent)
    if (this.autoScroll) {
      this.editContentWrapper.addEventListener('scroll', this.handleScroll, true)
      this.previewContentWrapper.addEventListener('scroll', this.handleScroll, true)
    }
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeEvent)
    this.editContentWrapper.removeEventListener('scroll', this.handleScroll)
    this.previewContentWrapper.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    input: {
      handler (val) {
        this.handleColumnChange()
        if (this.debounceRender) {
          this.debounceMarked(val)
        } else {
          this.$emit('input', val)
          this.$emit('on-change', {
            content: val,
            htmlContent: marked(val)
          })
          this.markedHtml = marked(val)
        }
      },
      immediate: true
    },
    value: {
      handler (val) {
        this.input = val
      },
      immediate: true
    },
    debounceWait: {
      handler (val) {
        this.debounceMarked = debounce(text => {
          this.$emit('input', text)
          this.$emit('on-change', {
            content: text,
            htmlContent: marked(text)
          })
          this.markedHtml = marked(text)
        }, val)
      },
      immediate: true
    },
    editFullScreen () {
      this.$nextTick(() => {
        this.handleResize()
      })
    }
  },
  methods: {
    handleKeyPress (e) { // 自定义默认 tab 事件
      const TABKEY = 9
      if (e.keyCode === TABKEY) {
        this.addContent('    ')
        if (e.preventDefault) {
          e.preventDefault()
        }
      }
    },
    addContent (content) { // 移动光标到添加文本的最后
      let pos = this.$refs.mTextarea.selectionStart
      if (pos > -1) {
        this.input = this.spliceStr(this.input, pos, content)
        this.$refs.mTextarea.blur()
        setTimeout(() => {
          this.$refs.mTextarea.selectionStart = pos + content.length
          this.$refs.mTextarea.selectionEnd = pos + content.length
          this.$refs.mTextarea.focus()
        })
      }
    },
    handleResize () { // resize
      let width = this.$refs.mEditor.clientWidth
      if (width > 780) {
        this.iconLength = this.config.length
      } else if (680 < width) {
        this.iconLength = this.config.length - 3
      } else if (640 < width) {
        this.iconLength = this.config.length - 6
      } else if (500 < width) {
        this.iconLength = this.config.length - 9
      } else if (width < 500) {
        this.iconLength = 0
        this.editMode = 'edit'
      }
      this.handleColumnChange()
    },
    handleColumnChange () {
      if (this.mode === 'preview') return false
      this.$nextTick(() => {
        this.columnLength = Math.max(this.input.split('\n').length, (this.$refs.inputPre.scrollHeight - 20) / 30)
      })
    },
    handleMouseOver (type) {
      this.scrollType = type
    },
    handleScroll () { // 滚动事件
      const editContentWrapper = this.$refs.editContentWrapper
      const previewContentWrapper = this.$refs.previewContentWrapper
      const editScroll = editContentWrapper.scrollTop
      const previewScroll = previewContentWrapper.scrollTop
      const editScrollMax = editContentWrapper.scrollHeight - editContentWrapper.offsetHeight
      const previewScrollMax = previewContentWrapper.scrollHeight - previewContentWrapper.offsetHeight
      if (this.scrollType === 'edit') {
        previewContentWrapper.scrollTop = previewScrollMax * (editScroll / editScrollMax)
      } else if (this.scrollType === 'preview') {
        editContentWrapper.scrollTop = editScrollMax * (previewScroll / previewScrollMax)
      }
    },
    handleModeEdit (mode, oldMode) {
      this.editMode = mode
      setTimeout(() => { // mode 改变后有 .2s 的动画，计算行数需要添加延时
        this.handleColumnChange()
      }, 200)
      this.$emit('on-mode-change', mode, oldMode)
    },
    handleFullScreenChange () {
      this.editFullScreen = !this.editFullScreen
      this.$emit('on-full-screen-change', this.editFullScreen)
    },
    /**
     * string 的 splice 方法
     */
    spliceStr (string, index, str) {
      return `${string.slice(0, index)}${str}${string.slice(index)}`
    }
  }
}
</script>
<style lang="scss">
@import "../assets/css/editor.scss";
@import "../assets/css/preview.scss";
</style>
