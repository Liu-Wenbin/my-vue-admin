<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :filterable="filterable"
    @change="change"
    class="common-select"
  >
    <el-option
      v-for="item in options"
      :key="item[props.value]"
      :label="item[props.label]"
      :value="item[props.value]"
    ></el-option>
  </el-select>
</template>

<script>
  export default {
    name: 'common-select',
    props: {
      filterable:{
        type:Boolean,
        default:false
      },
      value: {
        type: [String, Number],
        default: ''
      },
      options: {
        type: Array,
        required: true
      },
      props: {
        type: Object,
        default () {
          return {
            label: 'label',
            value: 'value'
          }
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      change (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .common-select {
    width: 100%;
    
    /deep/ .el-input{
      .el-input__inner {
        width: 100%; height: 2.08333333vw;
        line-height: 1.87500000vw;
        font-size: 0.93750000vw;
        background: rgba(9, 16, 45, 0.2);
        border-color: #064389;
        color: #fff;
        border-radius: 3px;

        &:hover {
          border-color: #007dff;
        }
      }
      .el-input__icon {
        line-height: 1.87500000vw;
      }
    }
  }
</style>

<style lang="less">
  .el-select-dropdown {
    padding: 0;
    border-radius: 3px;
    background: #0a2256;

    .el-scrollbar {
      border-radius: 3px;
    }
  }
  .el-select .el-input__inner,  .el-select-dropdown__empty {
    background: #0a2256;
    color: #fff;
  }

  .el-select-dropdown__list {
    padding: 0;
  }
  .el-select-dropdown__item {
    padding: 0 10px !important;
    height: 2.08333333vw;
    line-height: 2.08333333vw;
    background: rgba(6, 40, 106, 0.8);
    color: #acd9fb;
    text-align: left;
    box-shadow: 0px 2px 0px #0a2860;
  }

  .el-select-dropdown__item.hover {
    background: #0d46a1 !important;
  }

  .el-select-dropdown__item.selected {
    color: #fff;
    background: #1986d7 !important;
    font-weight: normal;
  }

  .el-popper[x-placement^=bottom] .popper__arrow::after {
    // background-color:#064480;
    border-bottom-color: #064480;
  }

 .el-select-dropdown .el-popper {
}

 .el-select-dropdown__list {
  background: #0a2256;
}
</style>
