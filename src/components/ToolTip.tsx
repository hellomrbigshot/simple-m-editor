import { defineComponent, ref } from 'vue'
import '../assets/css/tooltip.scss'

export default defineComponent({
  name: 'ToolTip',
  setup (_, { slots }) {
    const visible = ref<boolean>(false)
    const visible2 = ref<boolean>(false)
    const onMouseEnter = (e: MouseEvent, type: string) => {
      e.stopPropagation()
      if (type === 'content') {
        visible2.value = true
      }
      visible.value = true
    }
    const onMouseLeave = (e: MouseEvent, type: string) => {
      e.stopPropagation()
      if (type === 'main') {
        setTimeout(() => {
          if (!visible2.value) {
            visible.value = false
          }
        }, 500)
      } else if (type === 'content') {
        visible2.value = false
        visible.value = false
      }
    }
    return () => (
      <div class='tooltip-wrapper'>
        <div
          onMouseenter={e => onMouseEnter(e, 'main')}
          onMouseleave={e => onMouseLeave(e, 'main')}
        >
          {
            slots.default?.()
          }
        </div>
        <div
          class={['tooltip-content', visible.value ? 'mouse-in' : '']}
          onMouseenter={e => onMouseEnter(e, 'content')}
          onMouseleave={e => onMouseLeave(e, 'content')}
        >
          {
            slots.content?.()
          }
        </div>
      </div>
    )
  }
})
