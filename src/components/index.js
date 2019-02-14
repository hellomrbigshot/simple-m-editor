import markdownEditor from './markdownEditor.vue'

// import 方式引入
export default markdownEditor

// Vue.use() 全局注册
// export default {
//   install: function (Vue) {
//     Vue.component('m-editor', markdownEditor)
//   }
// }

// cdn 引入
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('m-editor', markdownEditor)
}
