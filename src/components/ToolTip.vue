<template>
  <div
    @mouseenter="handleShowPopper"
    @mouseover="handleShowPopper"
    @mouseleave="handleClosePopper"
    class="tool-tip-wrapper"
  >
    <div>
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        ref="popper"
        class="tool-tip-content"
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
    handleShowPopper () {
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
<style lang="scss" scoped>
.tool-tip-wrapper {
  position: relative;
}
.tool-tip-content {
  padding: 3px;
  position: absolute;
  margin-top: 5px;
  left: 0;
  z-index: 100;
  background: #fff;
  width: auto;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0 0 1px 1px #eee;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
