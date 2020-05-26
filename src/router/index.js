import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routes from './route'
import { Tool } from '@u'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = store.getters['login/isLogin'] // 是否已登录
  const isToLogin = to.name === 'login' // 是否去往登录页
  // 是否应该在路由不存在时跳到404页面，可能出现异步获取路由尚未获取到的情况
  const shouldGo404 = !($_funcConfig.authority.useRouteAuthority && !store.state.route.routeList.length)
  const isToAbsentRoute =  // 去往的路由是否不存在
    !Tool.filterFirstTreeNode(
      store.state.route.routeList,
      route => route.name === to.name
    ) &&
    !Tool.filterFirstTreeNode(
      routes,
      route => route.name === to.name
    )

  // 处理未登录的异常情况
  if (!isLogin) {
    if (!isToLogin) {
      return next({
        name: 'login'
      })
    }
  }

  // 处理已登录的异常情况
  if (isLogin) {
    if (isToLogin) {
      // 如果是从本项目的其他页面跳转过来的，则回该页面
      if (from.matched.length) {
        return next(from)
      }

      // 否则，去往首页
      return next({
        name: 'root'
      })
    }

    if (isToAbsentRoute && shouldGo404) {
      return next({
        name: 'not-found'
      })
    }
  }

  // 正常情况直接跳转
  next()
})

export default router
