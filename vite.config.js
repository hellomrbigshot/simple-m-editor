import { defineConfig } from 'vite'
// import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  let config = {
    base: './',
    plugins: [
      vue()
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
          entry: resolve(__dirname, 'src/index.js'),
          name: 'SimpleMEditor',
          // the proper extensions will be added
          fileName: 'simple-m-editor',
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue'],
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
