<template>
  <div class="upload-pic">
    <el-upload
      :http-request="onUploadFile"
      :multiple="multiple"
      :limit="maxLength"
      :on-remove="onRemovePic"
      :on-exceed="onExceed"
      list-type="picture-card"
      action="unknown"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: 'upload-pic',
    props: {
      // 上传api地址
      uploadApi: {
        type: String,
        required: true
      },
      // 上传的额外参数
      uploadParams: {
        type: Object,
        default: () => {}
      },
      // 上传图片文件的字段名
      uploadFileKey: {
        type: String,
        default: 'file'
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
    computed: {
      // 是否可以继续上传
      canContinueUpload () {
        return this.maxLength == null || this.picFileList.length < this.maxLength
      },
    },
    watch: {
      /**
       * 通过picFileList的长度变化来判断是否展示上传框
       */
      canContinueUpload (val) {
        const el = this.$el.querySelector('.el-upload.el-upload--picture-card')

        if (val) {
          setTimeout(() => {
            el.style.display = 'inline-block'
          }, 600)
        } else {
          el.style.display = 'none'
        }
      }
    },
    methods: {
      /**
       * 上传文件
       */
      onUploadFile ({ file }) {
        console.log(arguments)
        const params = new FormData()
        params.append(this.uploadFileKey, file)
        for (const key in this.uploadParams) {
          params.append(key, this.uploadParams[key])
        }

        let api = this.$_api
        this.uploadApi.split('.')
          .forEach(item => api = api[item])

        api(params)
          .then(res => {
            this.picFileList.push(file.uid)
            this.$emit('success-upload', res)
          })
          .catch(err => {
            this.$emit('fail-upload', err)
          })
      },
      /**
       * 预览图片
       */
      onPreviewPic (file) {
      },
      /**
       * 移除图片
       */
      onRemovePic ({ uid }) {
        const idx = this.picFileList.findIndex(item => item === uid)
        this.picFileList.splice(idx, 1)
      },
      /**
       * 图片上传数量超出限制时的钩子
       */
      onExceed () {
        this.$message.warning(`图片最大上传数量为${ this.maxLength }张`)
      },
    }
  }
</script>

<style lang="less" scoped>
  .upload-pic {
    display: inline-block;
  }
</style>