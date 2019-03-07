import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
import markdownEditor from '@/components/markdownEditor.vue'

describe('markdownEditor.vue', () => {
  it('renders props.input when passed', () => {
    const msg = '# hello world'
    const wrapper = shallowMount(markdownEditor, {
      propsData: { value: msg }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.html()).toMatch('<h1>hello world</h1>')
    })
  })
})