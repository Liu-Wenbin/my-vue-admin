<template>
  <div class="technology-front-end">
    <upload-pic
      :upload-api="uploadApi"
      :upload-params="uploadParams"
      :max-length="2"
      @success-upload="onSuccessUpload"
      multiple
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
        uploadApi: 'common.upload',
        uploadParams: {},
      }
    },
    methods: {
      onSuccessUpload (res) {
        console.log(res)
      }
    },
  }
</script>

<style lang="less" scoped>
  .technology-front-end {

  }
</style>