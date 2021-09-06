<template>
  <div class="editor-toolbar">
    <ul class="editor-toolbar-tools" ref="editTools">
      <template v-for="(item, i) in config">
        <li
          v-if="item.showIcon && i < iconLength"
          :key="i"
        >
          <span
            v-if="!item.children"
            :class="['iconfont', item.icon]"
            :title="item.title"
            @click="$emit('add-content', item.content)"
          />
          <tool-tip v-else>
            <span
              :class="['iconfont', item.icon]"
              :title="item.title"
            />
            <div slot="content">
              <div
                v-for="(_item, j) in item.children"
                :key="j"
                style="width: 100%;"
              >
                <span
                  :title="_item.title"
                   :style="{ fontSize: `${_item.size}px` }"
                  @click="$emit('add-content', _item.content)"
                >{{ _item.text }}</span>
              </div>
            </div>
          </tool-tip>
        </li>
      </template>
    </ul>
    <ul class="editor-toolbar-mode">
      <li>
        <span
          :class="['iconfont', !fullScreen && 'icon-quanping' || 'icon-huanyuanhuabu']"
          :title="!fullScreen && '全屏' || '还原'"
          @click="$emit('full-screen-change')"
        />
      </li>
      <li
        v-for="(modeItem, i) in modeConfig"
        :key="i"
      >
        <span
          :class="['iconfont', modeItem.icon, mode === modeItem.mode && 'muted']"
          @click="$emit('mode-change', modeItem.mode, mode)"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import ToolTip from './ToolTip'
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
export default {
  components: {
    ToolTip
  },
  props: {
    config: {
      type: Array,
      default: () => {
        return []
      }
    },
    iconLength: {
      type: Number,
      default: 0
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'edit',
      validator: (value) => {
        return ['live', 'preview', 'edit'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      modeConfig
    }
  }
}
</script>
<style lang="scss">
@import "../assets/css/toolbar.scss";
</style>