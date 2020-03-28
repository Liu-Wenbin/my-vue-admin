<template>
  <div class="login">
    <div class="login-box">
      <!-- logo区 -->
      <div class="logo-box">
        <div class="flex-wrapper">
          <h1 class="name">Vue Admin</h1>
          <h3 class="disc">后台管理系统</h3>
        </div>
      </div>

      <!-- 登录信息区 -->
      <div class="form-box"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {

      }
    },
  }
</script>

<style lang="less" scoped>
  .login {
    position: relative;
    width: 100vw; height: 100vh;
    background: url('~@a/img/login/login-bg.jpg') no-repeat center;
    background-size: cover;
    overflow: hidden;

    .login-box {
      position: absolute;
      top: 50%; right: 9vw;
      transform: translate(0, -50%);
      display: flex;
      width: 600px; height: 370.8px;
      background: #fff;
      border-radius: 4px;

      .logo-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        width: 229.2px; height: 100%;

        & > .flex-wrapper {
          .name,
          .disc {
            text-align: center;
          }
          .disc {
            font-size: 26px;
          }
        }
      }

      .form-box {
        flex: 1 1 auto;
        height: 100%;

      }
    }
  }
</style>