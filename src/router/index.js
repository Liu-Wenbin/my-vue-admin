import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routes from './route'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = store.getters['login/isLogin'] // 是否已登录
  const defaultRoute = store.getters['route/defaultRoute'] // 登录之后进入的默认路由
  const username = store.state.login.username // 用户名
  const isToLogin = to.name === 'login' // 是否去往登录页

  if (isLogin && isToLogin) { // 已登录但去往登录页的情况
    if (from.matched.length) { // 如果是从本项目其他路由过来的，则回去
      Vue.prototype.$message.info('您已经登录了哦~')

      return next(from)
    }

    // 否则进入路由首页
    return next(defaultRoute)
  } 

  if (!isLogin && !isToLogin) { // 未登录而且去往的不是登录页
    Vue.prototype.$message.warning('您还没有登录或登录已过期，请先登录吧~')

    return next({
      name: 'login'
    })
  }

	next()
})

export default router
