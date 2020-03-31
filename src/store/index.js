import Vue from 'vue'
import Vuex from 'vuex'

import login from './module/login'
import route from './module/route'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	login,
    route,
  }
})
