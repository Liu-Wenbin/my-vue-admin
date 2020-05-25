<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {

      }
    },
    created () {
      // 如果全局配置路由使用权限的话
      if ($_funcConfig.authority.useRouteAuthority) {
        this.reqGetRouteList()
      }
    },
    methods: {
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

        // 将获取到的路由列表放到store中供页面渲染
        this.$store.commit('route/setRouteList', routeList)

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
