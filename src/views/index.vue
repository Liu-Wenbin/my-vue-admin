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
          v-for="menu in subMenu.children"
          :key="menu.name"
          @click="clickPageRoute(menu)"
        >{{ menu.meta.title }}</a-menu-item>
      </a-sub-menu>
    </a-menu>

    <div class="view-box">
      <router-view class="admin-view"></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-admin',
    data () {
      return {
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
    },
    created () {
      this.setOpenMenuListAndSelected()
    },
    watch: {
      /**
       * 路由发生变化时重新设置展开菜单列表及选中项
       */
      $route () {
        this.setOpenMenuListAndSelected()
      },
    },
    methods: {
      /**
       * 根据路由设置展开菜单列表及选中项
       */
      setOpenMenuListAndSelected () {
        const route = this.$route

        const shouldSelectedMenuItem = route.name
        const shouldOpenMenu = route.meta.$parentRoute.name

        this.selectedMenuItem = [shouldSelectedMenuItem]
        this.openMenuList = [shouldOpenMenu]
      },
      /**
       * 点击页面级路由
       */
      clickPageRoute (menu) {
        this.$router.push({
          name: menu.name
        })
      },
      /**
       * 菜单展开列表发生变化的回调
       * 用于控制展开的菜单
       */
      onOpenMenuListChange (openKeys) {
        const prevOpenMenuList = this.openMenuList.slice()
        const shouldOpenMenu = openKeys.find(item => item !== prevOpenMenuList[0])
        if (shouldOpenMenu) {
          this.openMenuList = [shouldOpenMenu]
        } else {
          this.openMenuList = []
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
      width: calc(100vw - 256px);
    }
  }
</style>