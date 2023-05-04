const path = require('path');
const fs = require('fs');
const MarkdownIt = require('markdown-it'); 
import { style } from './assets/style'
const md = new MarkdownIt(); 
export const transformMarkdown = (text) => {
  return `
    <section class='article-content'>
      ${md.render(text)}
    </section>`
}

const mdRelationMap = new Map();

class MdModule {
  constructor(url) {
    this.url = url;
  }
}

export default function markdownPlugin() {
  const vueRE = /\.vue$/;
  const markdownRE = /\<g-markdown.*\/\>/g;
  const filePathRE = /(?<=file=("|')).*(?=('|"))/;

  return {
    name: 'vite-plugin-markdown-to-html',
    enforce: 'pre', 	// before other VitePress plugins
    handleHotUpdate(ctx) {
      const { file, server, modules } = ctx
      if (path.extname(file) !== '.md') return
      // 找到引入该 md 文件的 vue 文件
      const relationId = mdRelationMap.get(file);
      // 找到该 vue 文件的 moduleNode
      const relationModule = [...server.moduleGraph.getModulesByFile(relationId)][0];
      // 发送 websocket 消息，进行单文件热重载
      server.ws.send({
        type: 'update',
        updates: [
          {
            type: 'js-update',
            path: relationModule?.file,
            acceptedPath: relationModule?.file,
            timestamp: new Date().getTime()
          }
        ]
      });

      // 指定需要重新编译的模块
      return [...modules, relationModule]
    },
    transform(code, id, opt) {
      if (!vueRE.test(id) || !markdownRE.test(code)) return code;
      const mdList = code.match(markdownRE);
      console.log(mdList)
      let transformCode = code;
      mdList?.forEach(md => {
        // 匹配 markdown 文件目录
        const fileRelativePaths = md.match(filePathRE);
        if (!fileRelativePaths?.length) return;

        // markdown 文件的相对路径
        const fileRelativePath = fileRelativePaths[0];
        // 找到当前 vue 的目录
        const fileDir = path.dirname(id);
        // 根据当前 vue 文件的目录和引入的 markdown 文件相对路径，拼接出 md 文件的绝对路径
        let mdFilePath = path.join(fileDir, fileRelativePath);
        mdFilePath = mdFilePath.split(path.sep).join('/')
        // 读取 markdown 文件的内容
        const mdText = fs.readFileSync(mdFilePath, 'utf-8');
        // 将 g-markdown 标签替换成转换后的 html 文本
        transformCode = transformCode.replace(md, transformMarkdown(mdText));
        // 记录引入当前 md 文件的 vue 文件 id
        mdRelationMap.set(mdFilePath, id);
      })

      transformCode = `
        ${transformCode}
        <style scoped>
          ${style}
        </style>
      `

      // 将转换后的代码返回
      return transformCode;
    }
  }
}

// module.exports = markdownPlugin
// markdownPlugin['default'] = markdownPlugin