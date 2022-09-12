import ejs from 'ejs'
export default (options) => {
  return {
    // 转换html
    // 将插件的执行时机提前
    transformIndexHtml: {
      enforce: 'pre', // 控制执行时机， 提前执行
      transform: (html, ctx) => {
        // ctx 表示当前整个请求的执行上下文
        // console.log(html, ctx, 'html ctx')
        return ejs.render(html, options.inject.data)
      }
    }
  }
}