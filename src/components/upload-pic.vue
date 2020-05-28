<template>
  <div class="upload-pic">
    <el-upload
      action="unknown"
      list-type="picture-card"
      :on-preview="onPreviewPic"
      :on-remove="onRemovePic"
      :multiple="multiple"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: 'upload-pic',
    props: {
      // 上传图片的api路径
      uploadApi: {
        type: String,
        required: true,
      },
      // 上传图片时需要传的参数
      uploadParams: {
        type: Object,
        default: () => {}
      },
      // 是否允许多选上传
      multiple: {
        type: Boolean,
        default: false,
      },
      // 最大上传数量
      maxLength: {
        type: Number,
      }
    },
    data () {
      return {
        // 图片文件列表
        picFileList: [],
      }
    },
    methods: {
      /**
       * 预览图片
       */
      onPreviewPic () {

      },
      /**
       * 移除图片
       */
      onRemovePic () {

      },
    }
  }
</script>

<style lang="less" scoped>
  .upload-pic {
    display: inline-block;
  }
</style>