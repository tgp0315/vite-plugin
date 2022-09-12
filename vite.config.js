import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { createHtmlPlugin } from 'vite-plugin-html'
import viteAliases from './plugins/vite-aliases'
import viteHtml from './plugins/vite-html'
import viteMock from './plugins/vite-mock'
// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@src': '/src'
  //   }
  // },
  plugins: [
    vue(),
    viteAliases(),
    // createHtmlPlugin({
    //   inject: {
    //     data: {
    //       title: '首页'
    //     }
    //   }
    // })
    viteMock(),
    {
      options: (config) => {
        console.log(config, 'options')
      },
      buildStart: (config) => {
        console.log(config, 'buildStart')
      },
      resolveId: (config) => {
        console.log(config, 'resolveId')
      },
      load: (config) => {
        console.log(config, 'load')
      },
      transform: (config) => {
        console.log(config, 'transform')
      },
      buildEnd: (config) => {
        console.log(config, 'buildEnd')
      },
      config: (config, env) => { // 修改初始化配置
        console.log(config, env, 'config')
      },
      configResolved: (config) => {
        console.log(config, 'configResolved')
      },
      configureServer: (server) => {
        return () => {
          server.middlewares.use((req, res, next) => {
            console.log(req, res, 'configureServer')
            next()
            // 自定义请求处理...
          })
        }
      },
      configurePreviewServer: (server) => {
        return () => {
          server.middlewares.use((req, res, next) => {
            console.log(req, res, 'configurePreviewServer')
            next()
            // 自定义处理请求 ...
          })
        }
      },
      transformIndexHtml: {
        enforce: 'pre',
        transform: (html, ctx) => {
          console.log(html, ctx, transformIndexHtml)
          return html
        }
      }
    },
    viteHtml({
      inject: {
        data: {
          title: 'haha'
        }
      }
    })
  ]
})
