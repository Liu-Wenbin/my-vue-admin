import Vue from 'vue'

Vue.mixin({
  data () {
    return {
      // 是否开启权限路由
      useRouteAuthority: $_funcConfig.authority.useRouteAuthority,
      // 是否显示全屏操作图标
      showFullScreen: $_funcConfig.layout.showFullScreen,
      // Menu菜单是否使用手风琴模式
      useAccordionMenu: $_funcConfig.operate.useAccordionMenu,
      // 刷新之后是否回到首页
      goHomeAfterRefresh: $_funcConfig.operate.goHomeAfterRefresh,
      // 是否开启本项目的生产环境提示
      showProductTip: $_funcConfig.operate.showProductTip,
      // 是否启用缓存路由
      keepRouteAlive: $_funcConfig.operate.keepRouteAlive,
    }
  }
})