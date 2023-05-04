export default function firstPlugin() {
  return {
    name: 'vite-plugin-first',
    enforce: 'post', // 必须。使用此插件之前，不要再多说，直接使用文档中
    options: {
      order: 'pre', // 优先级比较高
      handler(options) {
        console.log('first-plugin')
        return null
      }
    },
  }
}