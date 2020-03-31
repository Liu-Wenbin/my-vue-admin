<template>
  <div class="not-found">
    <div class="error-code">4<span>0</span>4</div>
    <div class="error-desc">啊哦~ 您所访问的页面走丢了</div>
    <div class="error-handle">
      <a-button
        @click="clickToHomeButton"
        type="primary"
        size="large"
        class="btn"
      >返回首页</a-button>
      <a-button
        @click="clickGoBackButton"
        type="primary"
        size="large"
        class="btn"
      >返回上一页</a-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'not-found',
    methods: {
      /**
       * 点击 返回首页 按钮
       */
      clickToHomeButton () {
        this.$router.replace(this.$store.getters['route/defaultRoute'])
      },
      /**
       * 点击 返回上一页 按钮
       */
      clickGoBackButton () {
        this.$router.back()
      },
    },
  }
</script>
<style lang="less" scoped>
  .not-found {
    position: absolute;
    left: 50%; top: 40%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #fff;
    box-sizing: border-box;

    .error-code {
      line-height: 1;
      font-size: 250px;
      font-weight: bolder;
      color: #2d8cf0;
      animation: ani 1s infinite;
    }

    .error-code span {
      color: #00a854;
    }

    .error-desc {
      font-size: 30px;
      color: #777;
    }

    .error-handle {
      margin-top: 30px;

      .btn {
        margin: 0 25px;
      }
    }

    @keyframes ani {
      0% {
        letter-spacing: 8px;
        transform: translate(0px, 0px);
      }

      50% {
        letter-spacing: 10px;
        transform: translate(0px, -5px);
      }

      100% {
        letter-spacing: 8px;
        transform: translate(0px, 0px);
      }
    }
  }
</style>