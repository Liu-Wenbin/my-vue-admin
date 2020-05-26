<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { Tool } from '@u'
  import MyRoute from '@s/route'
  
  export default {
    name: 'app',
    data () {
      return {
        // 路由列表，供监听使用
        routeList: []
      }
    },
    computed: {
      // 是否登录
      isLogin () {
        return this.$store.getters['login/isLogin']
      },
    },
    created () {
      this.initRouteList()
    },
    watch: {
      /**
       * 当用户登录之后，去初始化路由列表
       * 当用户登出之后并且使用权限路由，清空路由列表
       */
      isLogin (val) {
        if (val) {
          this.initRouteList()
        } else if ($_funcConfig.authority.useRouteAuthority) {
          this.routeList = []
        }
      },
      routeList (val, old) {
        const routeList = this.routeList
        const mixins = {
          isMenu: true,
        }

        this.$router.addRoutes(new MyRoute(routeList, mixins))

        this.$store.commit('route/setRouteList', routeList)
      }
    },
    methods: {
      /**
       * 初始化路由列表
       * 该路由列表用于页面渲染
       */
      initRouteList () {
        // created钩子已经调用但用户尚未登录
        if (!this.isLogin) {
          return
        }

        // 如果全局配置路由使用权限
        if ($_funcConfig.authority.useRouteAuthority) {
          this.reqGetRouteList()
        }
      },
      /**
       * 接口 获取路由列表
       */
      reqGetRouteList () {
        // 期望接收如下格式的路由列表
        const routeList = [
          {
            name: 'love-current',
            meta: { title: '爱当下' },
            children: [
              {
                name: 'current-people',
                meta: { title: '有些人' }
              },
            ],
          },
          {
            name: 'love-game',
            meta: { title: '爱游戏' },
            children: [
              {
                name: 'game-yys',
                meta: { title: '阴阳师' }
              },
              {
                name: 'game-guard-radish',
                meta: { title: '保卫萝卜' }
              },
            ],
          },
        ]

        setTimeout(() => {
          this.routeList = routeList
        }, 0)

        // const params = {

        // }

        // this.$_api.common.getRouteList(params)
        //   .then(res => {

        //   })
      },
    }
  }
</script>

<style lang="less">

</style>
