<template>
  <div class="login">
    <div class="login-box">

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
      width: 600px; height: 370.8px;
      background: #fff;
      border-radius: 4px;
    }
  }
</style>