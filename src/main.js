import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'

// 全局样式重置
import '@a/style/base.less'

// postcss-pxtorem
import '@s/rem'

// 引入组件
import './ui'

// 项目配置提示
import '@s/configTip'

// 全局混入
import '@/mixins'

// 引入api
import api from '@/api'
Vue.prototype.$_api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
