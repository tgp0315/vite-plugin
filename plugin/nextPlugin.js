export default function nextPlugin() {
  return {
    name: 'vite-plugin-next',
    enforce: 'pre', // 必须。使用此插件之前，不要再多说，直接使用文档中
    options: {
      order: 'post',
      handler(options) {
        console.log('next-plugin')
        return null
      }
    }
  }
}