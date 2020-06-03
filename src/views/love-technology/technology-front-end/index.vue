<template>
  <div class="technology-front-end">
    <div class="box">
      <common-select
        :options="selectList"
        :props="selectProps"
      ></common-select>
    </div>
  </div>
</template>

<script>
  import CommonSelect from '@c/common-select'
  
  export default {
    name: 'technology-front-end',
    components: {
      'common-select': CommonSelect,
    },
    data () {
      return {
        selectList: [
          { name: '小明', value: '1' },
          { name: '小明', value: '2' },
          { name: '小明', value: '3' },
          { name: '小明', value: '4' },
          { name: '小明', value: '5' },
          { name: '小明', value: '6' },
          { name: '小明', value: '7' },
        ],
        selectProps: {
          label: 'name',
          value: 'value'
        }
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
    .box {
      width: 50%;
    }
  }
</style>