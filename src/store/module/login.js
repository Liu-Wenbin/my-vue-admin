import { Tool } from '@u'

export default {
  namespaced: true,

  state: {
    // 用户名
    username: Tool.getStorage('username') || '',
    // 登录的token
    token: Tool.getStorage('token') || '',
  },

  getters: {
    // 是否登录，通过token存在与否判断
    isLogin (state) {
      return !!state.token
    },
  },

  mutations: {
    /**
     * 更新登录信息，如果退出登录，不传payload即可
     */
    setLoginInfo (state, info = { username: '', token: '' }) {
      state.username = info.username
      state.token = info.token

      Tool.setStorage({
        username: state.username,
        token: state.token
      })
    },
  },
}