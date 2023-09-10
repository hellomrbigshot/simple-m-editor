import { defineComponent, toRefs } from 'vue'
import '../assets/css/column.scss'

export default defineComponent({
  name: 'SideColumn',
  props: {
    length: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const { length } = toRefs(props)
    return () => (
      <ul class='editor-content-edit-line-num'>{
        new Array(length.value).fill('').map((_, i) => (
          <li class={{ 'scale-li': length.value > 9999 }} key={i}>{i + 1}</li>
        ))
      }</ul>
    )
  }
})
