import { ref, defineComponent } from 'vue'
import defaultText from './example.md?raw'
import { version } from '../../package.json'
import { MEditor } from '../index'
import './example.css'
export default defineComponent({
  components: {
    MEditor
  },
  setup () {
    const theme = ref('light')
    const text = ref(defaultText)
    console.log(text.value, 'text')
    const change = (answer: string) => {
      console.log(answer)
    }
    const handleFullScreenChange = (fullScreen: string) => {
      console.log('fullScreen', fullScreen)
    }
    const handleModeChange = (mode: string, oldMode: string) => {
      console.log('mode', mode, 'oldMode', oldMode)
    }
    const handleThemeChange = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    return () => (
      <div class='wrapper'>
        <div class='comp-name'>vue-next-m-editor@{ version }</div>
        <div class="button" onClick={handleThemeChange}>{ theme.value === 'light' ? '暗黑模式' : '普通模式' }</div>
        <m-editor
          vModel={ text.value }
          theme={ theme.value }
          placeholder='请输入'
          debounce={ true }
          debounce-wait={ 300 }
          onChange={ change }
          onModeChange={ handleModeChange }
          onFullScreenChange={ handleFullScreenChange }
        />
      </div>
    )
  }
})
