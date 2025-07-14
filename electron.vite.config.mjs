import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteStaticCopy } from 'vite-plugin-static-copy'


export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      viteStaticCopy({
        targets: [
          {
            src: 'src/main/user-modules',
            dest: ''
          }
        ]
      })
    ],
    build: {
      rollupOptions: {
        input: {
          index: 'src/main/index.js',
          executor: 'src/main/executor.js', // <-- include this
          testLibrary: 'src/main/user-modules/test_library.js'
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [svelte()]
  }
})
