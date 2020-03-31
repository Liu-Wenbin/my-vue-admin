<template>
  <div class="my-admin">

    <!-- 左侧菜单栏 -->
    <a-menu
      mode="inline"
      theme="dark"
      class="side-menu"
    >
      <a-sub-menu
        v-for="subMenu in routeList"
        :key="subMenu.name"
      >
        <span slot="title"><a-icon type="mail"></a-icon><span>{{ subMenu.meta.title }}</span></span>
        <a-menu-item
          v-for="menu in subMenu.children"
          :key="menu.name"
        >{{ menu.meta.title }}</a-menu-item>
      </a-sub-menu>
    </a-menu>

    <router-view class=""></router-view>
  </div>
</template>

<script>
  import { Tool } from '@u'

  export default {
    name: 'my-admin',
    data () {
      return {
      }
    },
    computed: {
      // 路由列表
      routeList () {
        return this.$store.state.route.routeList
      },
    },
    methods: {

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

        // 子菜单
        .ant-menu-submenu {

          // 子菜单标题
          .ant-menu-submenu-title {
            .ant-menu-submenu-arrow {
              
            }
          }
        }
      }
    }
  }
</style>