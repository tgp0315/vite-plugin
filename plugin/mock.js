import fs from 'fs'

export default (options) => {
  return {
    name: 'vite-plugin-mock',
    configureServer(server) {
      // 服务器相关配置
      const mockStat = fs.statSync('mock')
      // console.log(mockStat, 'result')
      const isDirectory = mockStat.isDirectory()
      let mockResult = []
      if (isDirectory) {
        // let children = fs.readdirSync('mock')
        // console.log(children, 'children')
        mockResult = require('../mock/index.js').default
        // console.log(mockResult, 'result')
      }
      server.middlewares.use((req, res, next) => {
        // console.log(req.url, 'req res')
        const matchItem = mockResult.find(mockDescriptor => mockDescriptor.url === req.url)
        // console.log(matchItem, matchItem)
        if (matchItem) {
          const responseData = matchItem.response(req)

          console.log(responseData, 'responseData')
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify(responseData))
        } else {
          next()
        }
        // 自定义请求处理...
      })
    }
  }
}