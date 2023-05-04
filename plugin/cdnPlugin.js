import externalGlobals from 'rollup-plugin-external-globals'
export default function cdnPlugin(options) {
  let isBuild = false
  return {
    name: 'vite-plugin-cdn-plugin',
    config(_, { command }) {
      isBuild = command === 'build'
      if (isBuild) {
        const externalMap = options.modules.reduce((prev, cur) => {
          prev[cur.name] = cur.var
          return prev
        }, {})
        const userConfig = {
          build: {
            rollupOptions: {
              external: options.modules.map(module => module.name),
              plugins: [externalGlobals(externalMap)]
            }
          }
        }
        return userConfig
      }
    },
    transformIndexHtml(html) { // 操作html的时候，可以使用这个插件替换CDN的地址 
      if (isBuild) {
        const jsScripts = options.modules.map(module => {
            return `<script src="${module.url}"></script>`
        })
        // 插入到 title 后面，一般就是最开始的 script 标签了
        return html.replace('</title>', `</title>\n${jsScripts.join('')}`)
      }
    }
  }
}