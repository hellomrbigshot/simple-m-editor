<template>
  <div
    @mouseenter="handleShowPopper"
    @mouseover="handleShowPopper"
    @mouseleave="handleClosePopper"
    class="tooltip-wrapper"
  >
    <div>
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        ref="popper"
        class="tooltip-content"
        v-show="visible"
        @mouseenter="handleShowPopper"
        @mouseleave="handleClosePopper"
      >
        <div>
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleShowPopper() {
      if (!this.visible) {
        this.visible = true
      }
    },
    handleClosePopper() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss">
@import "../assets/css/tooltip.scss";
</style>
