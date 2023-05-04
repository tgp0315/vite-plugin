// vite的插件必须给vite返回一个配置对象  自动生成别名
import fs from 'fs'
import path from 'path'
import packageJson from '../package.json'
function diffDirAndFile(dirFileArr = [], basePath = '') {
  const result = {
    dirs: [],
    files: []
  }
  dirFileArr.forEach(name => {
    if (name === 'node_modules' || name.includes('.') || name === 'public') return
    const currentFileStat = fs.statSync(path.resolve(process.cwd() + basePath + '/' + name))
    const isDirectory = currentFileStat.isDirectory()
    if (isDirectory) {
      result.dirs.push(name)
    } else {
      result.files.push(name)
    }
  })
  return result
}
function getTotalDir() {
  const result = fs.readdirSync(path.join(__dirname, '../src'))
  const diffResult = diffDirAndFile(result, '/src')
  const resolveAliasesObj = {} // 放的就是一个一个的别名
  // console.log(diffResult, 'diffResult')
  diffResult.dirs.forEach(dirName => {
    const key = `@${dirName}`
    const absPath = path.resolve(process.cwd() + '/src/' + dirName)
    const projectName = packageJson.name
    console.log('key', key, absPath.split(`${projectName}`))
    resolveAliasesObj[key] = `${absPath.split(`${projectName}`)[1].replace(/\\/g, '/')}`
  })
  // console.log(resolveAliasesObj, 'resolveAliasesObj')
  return resolveAliasesObj
}
export default () => {
  return {
    name: 'vite-plugin-aliases',
    config(config, env) {
      // console.log(config, env, 'env')
      // config 目前的一个配置对象
      // config函数可以返回一个对象 这个对象是部分的viteconfig配置
      const resolveAliasesObj = getTotalDir()
      return {
      //   // 返回一个resolve出去,将目录下的所有文件进行别名
        resolve: {
          alias: resolveAliasesObj
        }
      }
    }
  }
}