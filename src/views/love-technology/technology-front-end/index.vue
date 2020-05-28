<template>
  <div class="technology-front-end">
    <upload-pic
      :upload-api="uploadPicApi"
      :upload-params="uploadPicParams"
      :max-length="2"
      class="upload-pic"
    ></upload-pic>
  </div>
</template>

<script>
  import UploadPic from '@c/upload-pic'
  
  export default {
    name: 'technology-front-end',
    components: {
      'upload-pic': UploadPic,
    },
    data () {
      return {
        uploadPicApi: 'http://www.baidu.com',
        uploadPicParams: {
          uid: Date.now() + ''
        },
      }
    },
    methods: {

    },
  }
</script>

<style lang="less" scoped>
  .technology-front-end {

  }
</style>