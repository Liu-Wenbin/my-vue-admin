import routes from '@/router/route'
import { Tool } from '@u'

// 拿到应该渲染到menu上的路由
// 因为到了menu渲染的时候会再做一次判断，所以不需要深度过滤子路由
const menuRouteList = routes.filter(topRoute => {
  return topRoute.meta && topRoute.meta.isMenu
})

export default {
  namespaced: true,

  state: {
    // 路由列表
    routeList: $_funcConfig.authority.useRouteAuthority ? [] : menuRouteList,
  },

  getters: {
    // 获取默认展示的路由
    // 此处取的是第一层路由的子路由
    defaultRoute (state) {
      const route = Tool.filterFirstTreeNode(
        state.routeList,
        item => !item.children || !item.children.length
      )

      return route || { name: 'root' }
    },
  },

  mutations: {
    /**
     * 设置路由列表
     */
    setRouteList (state, list = []) {
      state.routeList = list
    },
  }
}