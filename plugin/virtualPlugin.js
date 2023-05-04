// 引入虚拟文件
export default function virtualPlugin () {
  const virtualModuleId = 'virtual:my-virtual-file'  
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  return {
    name: 'my-plugin', // 必须的，将会在 warning 和 error 中显示
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
      return null
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        return 'export default "from virtual module"';
      }
      return null;
    }
  }
}