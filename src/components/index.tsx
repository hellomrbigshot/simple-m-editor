
import { defineComponent, toRefs, ref, watch, onMounted, onBeforeUnmount, watchEffect, App } from 'vue'
import ToolBar from './ToolBar'
import Column from './Column'
import { config } from '../assets/js/config'
import hljs from 'highlight.js'
import { markedHighlight } from 'marked-highlight'
import {  Marked } from 'marked'
import { throttle, debounce } from 'lodash-es'
import '../assets/css/editor.scss'
import '../assets/css/preview.scss'
import '../assets/css/solarized-light.scss'

const markedFun = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  }),
  {
    pedantic: false,
    gfm: true,
    breaks: true,
    headerIds: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  }
)

const betterMarked = (str: string) => { // replace <code> tags to <code class="hljs">
  return (markedFun.parse(str) as string).replace(/<code( class="language-[A-Za-z]*")?>/g, '<code class="hljs">')
}

export const marked = betterMarked

export const MEditor = defineComponent({
  name: 'VueNextMEditor',
  components: {
    ToolBar,
    Column
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    showLineNum: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'live',
      validator: (value: string) => ['live', 'edit', 'preview'].includes(value)
    },
    theme: {
      type: String,
      default: 'light',
      validator: (value: string) => ['light', 'dark'].includes(value)
    },
    autoScroll: {
      type: Boolean,
      default: true
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
  emits: [
    'on-change',
    'on-mode-change',
    'on-fullscreen-change',
    'update:modelValue'
  ],
  setup (props, { emit }) {
    const { showLineNum, placeholder, autoScroll, debounceRenderWait, debounceRender, theme } = toRefs(props)
    const iconLength = ref(config.length)
    const columnsLength = ref(1)
    const mode = ref(props.mode)
    const fullScreen = ref(props.fullScreen)
    const defaultValue = ref('')
    const markedHtml = ref('')
    const scrollType = ref('edit')
    const mEditorRef = ref<HTMLDivElement>()
    const mTextareaRef = ref<HTMLTextAreaElement | null>(null)
    const editWrapperRef = ref<HTMLDivElement>()
    const previewWrapperRef = ref<HTMLDivElement>()
    const inputPreRef = ref<HTMLDivElement>()

    const setHtml = (_value: string) => {
      if (debounceRender.value) {
        debounceMarked(_value)
      } else {
        markedHtml.value = betterMarked(_value)
      }
    }
    const handleModeChange = (_mode: string, oldMode: string) => {
      mode.value = _mode
      emit('on-mode-change', _mode, oldMode)
    }
    const handleFullScreenChange = (_fullScreen: boolean) => {
      fullScreen.value = _fullScreen
      emit('on-fullscreen-change', _fullScreen)
    }
    const debounceMarked = debounce((value: string) => {
      markedHtml.value = betterMarked(value)
    }, debounceRenderWait.value)
    const handleScroll = autoScroll.value ? throttle(() => { // scrollEvent
      if (editWrapperRef.value && previewWrapperRef.value) {
        const editWrapperRefMaxScrollTop = editWrapperRef.value.scrollHeight - editWrapperRef.value.clientHeight
        const previewWrapperRefMaxScrollTop = previewWrapperRef.value.scrollHeight - previewWrapperRef.value.clientHeight
        if (scrollType.value === 'edit') {
          previewWrapperRef.value.scrollTop = (editWrapperRef.value.scrollTop / editWrapperRefMaxScrollTop) * previewWrapperRefMaxScrollTop
        } else if (scrollType.value === 'preview') {
          editWrapperRef.value.scrollTop = (previewWrapperRef.value.scrollTop / previewWrapperRefMaxScrollTop) * editWrapperRefMaxScrollTop
        }
      }
    }, 200) : undefined
    const onInput = (e: Event) => {
      const input = e.target as HTMLTextAreaElement
      defaultValue.value = input.value
      emit('update:modelValue', input.value)
    }

    const handleAppendContent = (str: string) => { // append content
      console.log('appendStr', str)
      console.log('mTextareaRef', mTextareaRef.value)
      if (!mTextareaRef.value) {
        return
      }
      const pos = mTextareaRef.value.selectionStart || 0
      if (pos > -1) {
        defaultValue.value = `${defaultValue.value.slice(0, pos)}${str}${defaultValue.value.slice(pos)}`
        mTextareaRef.value.blur()
        setTimeout(() => {
          if (mTextareaRef.value) {
            mTextareaRef.value.selectionStart = pos + str.length
            mTextareaRef.value.selectionEnd = pos + str.length
            mTextareaRef.value.focus()
          }
        })
      }
    }
    const handleResize = () => { // resize
      console.log('resize')
      const width = mEditorRef?.value?.clientWidth || 0
      let _length: number = 0
      if (width > 780) {
        _length = config.length
      } else if (width > 680) {
        _length = config.length - 3
      } else if (width > 640) {
        _length = config.length - 6
      } else if (width > 500) {
        _length = 0
        mode.value = 'edit'
      }
      iconLength.value = _length
      getColumnLines()
    }
    const handleThrottleResize = throttle(handleResize, 300)
    const getColumnLines = () => { // get column length
      console.log('inputPreRef', inputPreRef.value)
      const textareaHeight = inputPreRef.value ? inputPreRef.value.scrollHeight : 0
      const length = Math.max(defaultValue.value.split('\n').length, (textareaHeight - 20) / 30)
      columnsLength.value = length
    }

    const handleKeyPress = (e: KeyboardEvent) => { // key press event
      const TAB_KEY = 'Tab'
      if (e.code === TAB_KEY) { // tab event
        handleAppendContent('    ')
        if (e.preventDefault) {
          e.preventDefault()
        }
      }
    }
    // watch([markedHtml], ([newVal]) => {
    //   console.log('markedHtml', newVal)
    // })

    watchEffect(() => {
      setTimeout(() => {
        getColumnLines()
      }, 200)
      // console.log('trigger')
      emit('on-change', { content: defaultValue.value, htmlContent: betterMarked(defaultValue.value) })
      setHtml(defaultValue.value)
    })

    onMounted(() => {
      console.log('onMounted')
      window.addEventListener('resize', handleThrottleResize)
      handleResize()
      console.log('mTextareaRef', mTextareaRef.value)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleThrottleResize)
    })

    watch([fullScreen, mode], () => {
      console.log('fullScreenChange or mode change')
      setTimeout(() => {
        getColumnLines()
      }, 200)
    })
    watch(
      () => props.modelValue,
      (newVal) => {
        console.log(newVal, 'newVal')
        defaultValue.value = newVal
      },
      { immediate: true }
    )

    return () => (
      <div
        ref={mEditorRef}
        class={['editor', `${theme.value}-editor`, fullScreen.value && 'editor-fullscreen']}
      >
        <ToolBar
          iconLength={ iconLength.value }
          mode={ mode.value }
          full-screen={ fullScreen.value }
          onMode-change={ handleModeChange }
          onFullscreen-change={ handleFullScreenChange }
          onAppend-content={ handleAppendContent }
        />
        <div class='editor-content'>
          <div
            class={['editor-content-edit', mode.value === 'edit' && 'active', mode.value === 'preview' && 'inactive']}
            ref={editWrapperRef}
            onMouseenter={() => { scrollType.value = 'edit' }}
            onScroll={handleScroll}
          >
            <div class='editor-content-edit-block'>
              {
                showLineNum.value
                  ? <Column length={columnsLength.value} />
                  : ''
              }
              <div class='editor-content-edit-input'>
                {/* <div ref={inputPreRef}>{defaultValue.value?.replace(/\n$/, '\n ')}</div> */}
                <div ref={ inputPreRef }>{ defaultValue.value }</div>
                <textarea
                  ref={mTextareaRef}
                  value={defaultValue.value}
                  placeholder={placeholder.value}
                  onKeydown={handleKeyPress}
                  onInput={onInput}
                />
              </div>
            </div>
          </div>
          <div
            class={['editor-content-preview', mode.value === 'preview' && 'active', mode.value === 'edit' && 'inactive']}
            ref={previewWrapperRef}
            onMouseenter={() => scrollType.value = 'preview'}
            onScroll={handleScroll}
          >
            <div
              class='m-editor-preview'
              v-html={markedHtml.value}
            />
          </div>
        </div>
      </div>
    )
  }
})

MEditor.install = (app: App) => {
  app.component(MEditor.name, MEditor)
}
