<template>
  <div class="layout-top-bar">
    <!-- 全屏 -->
    <div
      v-if="showFullScreen"
      @click="onClickFullScreenButton"
      class="full-screen"
    >
      <a-icon
        v-if="!isFullScreen"
        type="fullscreen"
        class="icon-screen"
      ></a-icon>
      <a-icon
        v-else
        type="fullscreen-exit"
        class="icon-screen"
      ></a-icon>
    </div>

    <!-- 用户名 -->
    <a-dropdown :trigger="['click']">
      <div class="user-box">
        <span class="username">{{ username }}</span>
        <a-icon type="down" class="icon-down"></a-icon>
      </div>

      <a-menu
        slot="overlay"
        class="dropdown-menu"
      >
        <a-menu-item
          @click="onClickLogoutButton"
          key="1"
        >
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'layout-top-bar',
    data () {
      return {
        // 是否显示全屏图标
        showFullScreen: $_funcConfig.layout.showFullScreen,
        // 是否全屏
        isFullScreen: false,
      }
    },
    computed: {
      // 用户名
      username () {
        return this.$store.state.login.username
      },
    },
    mounted () {
      if (this.showFullScreen) {
        this.initScreenChangeListener()
        this.handleF11FullScreen()
      }
    },
    methods: {
      /**
       * 注册监听全屏变化事件
       */
      initScreenChangeListener () {
        const handler = () => this.isFullScreen = !this.isFullScreen

        document.addEventListener('fullscreenchange', handler, false)
        document.addEventListener('mozfullscreenchange', handler, false)
        document.addEventListener('webkitfullscreenchange', handler, false)
        document.addEventListener('msfullscreenchange', handler, false)
      },
      /**
       * 处理F11全屏
       */
       handleF11FullScreen () {
        document.addEventListener('keydown', e => {
          if (e.keyCode === 122) {
            e.preventDefault()
            this.onClickFullScreenButton()
          }
        })
      },
      /**
       * 点击全屏按钮
       */
      onClickFullScreenButton () {
        const body = document.body
        if (this.isFullScreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          if (body.requestFullscreen) {
            body.requestFullscreen()
          } else if (body.mozRequestFullScreen) {
            body.mozRequestFullScreen()
          } else if (body.webkitRequestFullScreen) {
            body.webkitRequestFullScreen()
          } else if (body.msRequestFullscreen) {
            body.msRequestFullscreen()
          }
        }
      },
      /**
       * 点击退出登录按钮
       */
       onClickLogoutButton () {
        this.$store.commit('login/setLoginInfo')
      },
    }
  }
</script>

<style lang="less" scoped>
  .layout-top-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 22px;
    height: 66px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    /* 全屏 */
    .full-screen {
      padding: 4px;
      cursor: pointer;

      .icon-screen {
        font-size: 20px;
        vertical-align: middle;
      }
    }

    /* 用户 */
    .user-box {
      padding: 10px;
      font-size: 20px;
      cursor: pointer;

      .icon-down {
        margin-left: 2px;
        font-size: 18px;
        vertical-align: middle;
      }
    }
  }
</style>