import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式重置
import '@a/style/base.less'

// 引入组件
import './ui'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
