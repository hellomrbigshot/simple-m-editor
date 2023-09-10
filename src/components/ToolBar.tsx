import { defineComponent, toRefs } from 'vue'
import { config, configItem } from '../assets/js/config'
import ToolTip from './ToolTip'
import '../assets/css/icon.css'
import '../assets/css/toolbar.scss'

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
export default defineComponent({
  name: 'Toolbar',
  components: {
    ToolTip
  },
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'live'
    },
    iconLength: {
      type: Number,
      required: true
    }
  },
  emits: ['mode-change', 'append-content', 'fullscreen-change'],
  setup (props, { emit }) {
    const { fullScreen, mode, iconLength } = toRefs(props)

    const appendContent = (content: string) => {
      emit('append-content', content)
    }
    const fullScreenChange = (fullScreen: boolean) => {
      emit('fullscreen-change', fullScreen)
    }
    const modeChange = (_mode: string) => {
      if (_mode !== mode.value) {
        emit('mode-change', _mode, mode.value)
      }
    }
    const toolTipSlots = (item: configItem) => ({
      default: () => <span class={['iconfont', item.icon]} title={item.title}/>,
      content: () => item.children?.map((_item, j) => (
        <div key={j}>
          <span
            style={{fontSize: `${_item.size}px`}}
            title={_item.title}
            onClick={() => appendContent(_item.content)}
          >{_item.text}</span>
        </div>
      ))
    })
    return () => (
      <div class='editor-toolbar'>
        <ul class='editor-toolbar-tools'>
          {
            config.map((item, key) => {
              return item.showIcon && key < iconLength.value
                ? (
                    <li key={key}>
                      {
                        item.children && item.children.length
                          ? <ToolTip v-slots={toolTipSlots(item)}/>
                          : <span
                              class={['iconfont', item.icon]}
                              title={item.title}
                              onClick={() => appendContent(item.content as string)}
                            />
                      }
                    </li>
                  )
                : null
            })
          }
        </ul>
        <ul class='editor-toolbar-mode'>
          <li>
            <span
              class={['iconfont', !fullScreen.value ? 'icon-quanping' : 'icon-huanyuanhuabu']}
              title={!fullScreen.value ? '全屏' : '还原'}
              onClick={() => fullScreenChange(!fullScreen.value)}
            />
          </li>
          {
            modeConfig.map((item, i) => (
              <li key={i}>
                <span
                  class={['iconfont', item.icon, mode.value === item.mode && 'muted']}
                  onClick={() => modeChange(item.mode)}
                />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
})
