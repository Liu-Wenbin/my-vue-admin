<template>
  <div class="my-admin">

    <!-- 左侧菜单栏 -->
    <a-menu
      v-model="selectedMenuItem"
      :open-keys="openMenuList"
      @openChange="onOpenMenuListChange"
      mode="inline"
      theme="dark"
      class="side-menu"
    >
      <!-- 一级路由 -->
      <a-sub-menu
        v-for="subMenu in routeList"
        :key="subMenu.name"
      >
        <div slot="title">
          <a-icon type="mail"></a-icon>
          <span>{{ subMenu.meta.title }}</span>
        </div>

        <!-- 二级路由 -->
        <a-menu-item
          v-if="menu.meta.isMenu"
          v-for="menu in subMenu.children"
          :key="menu.name"
        >{{ menu.meta.title }}</a-menu-item>
      </a-sub-menu>
    </a-menu>

    <div class="view-box">
      <!-- 顶部状态栏 -->
      <layout-top-bar></layout-top-bar>

      <keep-alive>
        <router-view class="admin-view"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import { Tool } from '@u'
  import LayoutTopBar from '@v/common/common-layout/layout-top-bar'

  export default {
    name: 'my-admin',
    components: {
      'layout-top-bar': LayoutTopBar,
    },
    data () {
      return {
        // Menu是否使用手风琴模式
        useAccordionMenu: $_funcConfig.operate.useAccordionMenu,
        // 是否在路由刷新后返回首页
        goHomeAfterRefresh: $_funcConfig.operate.goHomeAfterRefresh,
        // 选中的菜单项（路由）
        selectedMenuItem: [],
        // 展开菜单列表
        openMenuList: [],
      }
    },
    computed: {
      // 路由列表
      routeList () {
        return this.$store.state.route.routeList
      },
      // 默认路由
      defaultRoute () {
        return this.$store.getters['route/defaultRoute']
      },
    },
    created () {
      this.setOpenMenuListAndSelected()
    },
    watch: {
      /**
       * 路由发生变化时重新设置展开菜单列表及选中项
       */
      $route (to) {
        this.setOpenMenuListAndSelected()
      },
      /**
       * 用于接口请求完成后路由列表发生变化
       */
      routeList () {
        this.setOpenMenuListAndSelected()
      },
      /**
       * 路由跳转到选中的菜单
       */
      selectedMenuItem (val, old) {
        if (val.length) {
          this.$router.push({
            name: val[0]
          })
        }
      },
    },
    methods: {
      /**
       * 根据路由设置展开菜单列表及选中项
       */
      setOpenMenuListAndSelected () {
        // 尚未请求到路由列表
        if (!this.routeList.length) {
          return
        }

        let route

        if (this.goHomeAfterRefresh) {
          route = this.defaultRoute
          // 这里置为false是为了不让它干扰刷新过后的路由判断
          this.goHomeAfterRefresh = false
        } else {
          if (this.$route.name === 'root') {
            route = this.defaultRoute
          } else if (!this.$route.meta.$parentRoute) {
            const children = this.$route.meta.$children

            if (children.length) {
              route = children[0]
            } else {
              route = this.defaultRoute
            }
          } else {
            route = this.$route
          }
        }

        const shouldSelectedMenuItem = route.name
        let shouldOpenMenuList

        if (shouldSelectedMenuItem === 'root') {
          shouldOpenMenuList = []
        } else {

          if (this.useAccordionMenu) {
            shouldOpenMenuList = [route.meta.$parentRoute.name]
          } else {
            shouldOpenMenuList = [
              ...new Set([
                ...this.openMenuList,
                route.meta.$parentRoute.name
              ])
            ]
          }
        }

        this.selectedMenuItem = [shouldSelectedMenuItem]
        this.openMenuList = shouldOpenMenuList
      },
      /**
       * 菜单展开列表发生变化的回调
       * 用于控制展开的菜单
       */
      onOpenMenuListChange (openKeys) {
        if (this.useAccordionMenu) {
          const prevOpenMenuList = this.openMenuList.slice()
          const shouldOpenMenu = openKeys.find(item => item !== prevOpenMenuList[0])

          if (shouldOpenMenu) {
            this.openMenuList = [shouldOpenMenu]
          } else { // 用于处理点击已展开menu的情况
            this.openMenuList = []
          }
        } else {
          this.openMenuList = openKeys
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .my-admin {
    display: flex;

    /deep/ .side-menu {
      width: 256px; height: 100vh;
      overflow: hidden;

      &:hover {
        overflow-y: auto;
      }
    }

    .view-box {
      width: calc(100vw - 256px); height: 100vh;

      .admin-view {
        height: calc(100% - 66px);
        overflow: auto;
      }
    }
  }
</style>