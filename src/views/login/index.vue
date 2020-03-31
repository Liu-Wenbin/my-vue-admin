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
      <div class="form-box">
        <div class="structure-box">
          <div class="flex-wrapper">
            <div class="login-title">
              <img src="@a/img/login/login-icon.png" class="login-icon">
              <span class="login-span">登录/Login</span>
            </div>

            <div class="login-form">
              <div class="form-item">
                <span class="form-label">账号</span>
                <el-input
                  v-model="username"
                  @keyup.enter.native="reqCommitLogin"
                  placeholder="请输入用户名"
                  class="form-input"
                ></el-input>
              </div>
              <div class="form-item">
                <span class="form-label">密码</span>
                <el-input
                  v-model="password"
                  type="password"
                  @keyup.enter.native="reqCommitLogin"
                  placeholder="请输入密码"
                  class="form-input"
                ></el-input>
              </div>
            </div>

            <div class="login-commit">
              <i-button
                type="primary"
                :loading="isLoginCommitBtnLoading"
                @click="clickLoginButton"
                class="login-commit-button"
              >立即登录</i-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        // 登录的用户名
        username: '',
        // 登录的密码
        password: '',
        // 用于控制登录按钮的loading显示与否
        isLoginCommitBtnLoading: false,
      }
    },
    methods: {
      /**
       * 点击 登录 按钮
       */
      clickLoginButton () {
        this.reqCommitLogin()
      },
      /**
       * 请求登录
       */
      reqCommitLogin () {
        this.isLoginCommitBtnLoading = true

        const params = {
          username: this.username,
          password: this.password,
        }

        this.$_api.login.commitLogin(params)
          .then(({ data }) => {
            if (data && data.token) {
              this.$store.commit('login/setLoginInfo', {
                username: this.username,
                token: data.token,
              })

              this.$router.push(this.$store.getters['route/defaultRoute'])
            } else {
              this.$message.warning('账号或密码错误')
            }
          })
          .finally(() => {
            this.isLoginCommitBtnLoading = false
          })
      },
    }
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
            font-weight: bold;
          }
        }
      }

      .form-box {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        height: 100%;

        & > .structure-box {
          display: flex;
          justify-content: space-around;
          width: 100%;
          border-left: 1px solid #E9EEF7;

          & > .flex-wrapper {
            width: 266px;

            .login-title {
              display: flex;
              align-items: center;

              .login-icon {
                margin-right: 10px;
              }

              .login-span {
                font-size: 22px;
                color: #777;
              }
            }

            .login-form {
              margin-top: 10px;
              
              .form-item {
                display: flex;
                align-items: center;
                padding: 6px 0;
                border-bottom: 1px solid #E9EEF7;

                .form-label {
                  flex: 0 0 auto;
                  width: 46px;
                  font-size: 18px;
                  color: #333;
                }

                .form-input {
                  width: 160px;

                  /deep/ .el-input__inner {
                    border-color: transparent;
                    font-size: 16px;
                  }
                }
              }
            }

            .login-commit {
              display: flex;
              justify-content: space-around;
              margin-top: 20px;

              .login-commit-button {
                width: 80%;
                height: 40px;
                border-radius: 20px;
                font-size: 18px;
              }
            }
          }
        }
      }
    }
  }
</style>