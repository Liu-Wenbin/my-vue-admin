import routes from '@/router/route'
import { Tool } from '@u'

const routeList = Tool.filterFirstTreeNode(routes, item => item.meta.isRootRoute).children

export default {
  namespaced: true,

  state: {
    // 路由列表
    routeList: routeList,
  },

  getters: {
    // 获取默认展示的路由，此处为第二层路由的第一个
    defaultRoute (state) {
      return state.routeList[0].children[0]
    },
  },

  mutations: {
    /**
     * 设置路由列表
     */
    setRouteList (state, list) {
      state.routeList = list
    },
  }
}