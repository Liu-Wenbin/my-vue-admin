import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routes from './route'
import { Tool } from '@u'

Vue.use(VueRouter)

// 隐藏vue-router@3.1.0两次进入相同路由报的警告
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const routerCreator = () => {
  return new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
  })
}

export const router = routerCreator()

router.beforeEach((to, from, next) => {
  const isLogin = store.getters['login/isLogin'] // 是否已登录
  const isToLogin = to.name === 'login' // 是否去往登录页
  const isTo404 = to.name === 'not-found' // 是否去往404页面
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
  const isFromAbsentRoute = // 过来的路由是否不存在
    !Tool.filterFirstTreeNode(
      store.state.route.routeList,
      route => route.name === from.name
    ) &&
    !Tool.filterFirstTreeNode(
      routes,
      route => route.name === from.name
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
