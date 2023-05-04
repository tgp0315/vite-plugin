import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import firstPlugin from './plugin/firstPlugin'
import nextPlugin from './plugin/nextPlugin'
import virtualPlugin from './plugin/virtualPlugin'
import cdnPlugin from './plugin/cdnPlugin'
import markdownPlugin from './plugin/mkToHtml/mkToHtml'
import Mock from './plugins/mock'
import Aliases from './plugins/aliases'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [
    Aliases(),
    vue(), 
    virtualPlugin(), 
    firstPlugin(), 
    nextPlugin(), 
    Mock(),
    cdnPlugin({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          url: 'https://unpkg.com/vue@3/dist/vue.global.js'
        }
      ]
    }),
    markdownPlugin()
  ]
})
