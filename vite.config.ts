import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    base: './',
    plugins: [
      vue(),
      vueJsx()
    ]
  }
  if (mode === 'gh-pages') {
    return config
  } else {
    return {
      ...config,
      build: {
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'VueNextMEditor',
          // the proper extensions will be added
          fileName: (format) => {
            return `vue-next-m-editor.${format === 'es' ? 'mjs' : `${format}.js` }`
          }
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue'],
          plugins: [
            typescript({ declarationDir: './dist' })
          ],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: 'Vue',
            },
          },
        }
      }
    }
  }
})
