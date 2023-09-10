/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    quotes: ['error', 'single'], // 使用单引号
    semi: ['error', 'never'], // 禁止在语句末尾使用分号
    'space-before-function-paren': ['error', 'always'], // function 左括号之前需要有空格
    'arrow-spacing': ['error', { before: true, after: true }], // 箭头函数箭头前后需要有空格
    'comma-spacing': ['error', { 'before': false, 'after': true }], // 逗号后面有空格，前面没有空格
    'object-curly-spacing': ['error', 'always'], // 大括号左右需要有空格
    'space-before-blocks': ['error', 'always'], // 大括号之前需要有空格
    'space-infix-ops': 'error', // 运算符周围需要有空格
    'key-spacing': ['error', { beforeColon: false, afterColon: true }], // 冒号左边不需要空格，右边需要空格
    'indent': ['error', 2], // 缩进为2个空格
    'vue/html-indent': ['error', 2, {}], // 模板缩进为2个空格
  }
}
