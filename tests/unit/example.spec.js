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
import Editor from '@/Editor/index'

describe('Editor.vue', () => {
  it('renders props.input when passed', () => {
    const msg = '# hello world'
    const wrapper = shallowMount(Editor, {
      propsData: { value: msg }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.value).toMatch('# hello world')
    })
  })
})