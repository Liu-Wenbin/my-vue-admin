<!-- 修改自 npm 项目 vue-piczoom -->

<template>
  <div
    @mouseleave="mouseleave"
    @mousemove="mousemove"
    @mouseenter="mouseover"
    class="pic-zoom"
  >
    <img
      :src="url"
      ref="img"
      class="img"
    >
    <div
      ref="coverBox"
      class="mouse-cover"
    ></div>
  </div>
</template>

<script>
  export default {
    props: {
      scale: {
        type: Number,
        default: 2
      },
      url: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        imgEle: null,
        coverBoxEle: null, // 覆盖层，也是放大层
        imgWidth: 0,
        imgHeight: 0,
        coverBoxWidth: 0,
        coverBoxHeight: 0,
      }
    },
    mounted(){
      this.init()
    },
    watch: {
      url (val) {
        if (val) {
          this.init()
        }
      }
    },
    methods: {
      init () {
        this.imgEle = this.$refs.img
        this.coverBoxEle = this.$refs.coverBox
        this.coverBoxEle.style.left = '-100%'
        this.coverBoxEle.style.top = '-100%'
        this.imgWidth = Number.parseFloat(getComputedStyle(this.imgEle).width)
        this.imgHeight = Number.parseFloat(getComputedStyle(this.imgEle).height)
        this.coverBoxWidth = Number.parseFloat(getComputedStyle(this.coverBoxEle).width)
        this.coverBoxHeight = Number.parseFloat(getComputedStyle(this.coverBoxEle).height)
      },
      mousemove (e) {
        // 获取元素实际的offset
        const offset = ele => {
          let totalLeft = null
          let totalTop = null
          let parentOffsetEle = ele.offsetParent

          // 首先加自己本身的左偏移和上偏移
          totalLeft += ele.offsetLeft
          totalTop += ele.offsetTop

          // 只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
          while (parentOffsetEle) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
              // 累加父级参照物的边框
              totalLeft += parentOffsetEle.clientLeft
              totalTop += parentOffsetEle.clientTop
            }
            
            // 累加父级参照物本身的偏移
            totalLeft += parentOffsetEle.offsetLeft
            totalTop += parentOffsetEle.offsetTop
            parentOffsetEle = parentOffsetEle.offsetParent
          }
      
          return {
            left: totalLeft,
            top: totalTop
          }
        }

        const coverBoxEleWidth = this.coverBoxEle.offsetWidth
        const coverBoxEleHeight = this.coverBoxEle.offsetHeight
        const mouseXY = {
          x: e.clientX,
          y: e.clientY
        }
        
        const coverBoxEleXY = {
          x: mouseXY.x - coverBoxEleWidth / 2,
          y: mouseXY.y - coverBoxEleHeight / 2,
        }
        const imgOffset = offset(this.imgEle)
        const offsetRange = {
          minX: imgOffset.left,
          maxX: imgOffset.left + this.imgEle.offsetWidth - this.coverBoxEle.offsetWidth,
          minY: imgOffset.top - document.documentElement.scrollTop,
          maxY: imgOffset.top - document.documentElement.scrollTop + this.imgEle.offsetHeight - this.coverBoxEle.offsetHeight,
        }

        coverBoxEleXY.x > offsetRange.maxX && (coverBoxEleXY.x = offsetRange.maxX)
        coverBoxEleXY.x < offsetRange.minX && (coverBoxEleXY.x = offsetRange.minX)
        coverBoxEleXY.y > offsetRange.maxY && (coverBoxEleXY.y = offsetRange.maxY)
        coverBoxEleXY.y < offsetRange.minY && (coverBoxEleXY.y = offsetRange.minY)

        this.coverBoxEle.style.left = coverBoxEleXY.x + 'px'
        this.coverBoxEle.style.top = coverBoxEleXY.y + 'px'

        const bgPosition = {
          x: (imgOffset.left - mouseXY.x) * this.scale + this.coverBoxWidth / 2,
          y: (imgOffset.top - mouseXY.y) * this.scale + this.coverBoxHeight / 2
        }

        const imgPositionRange = {
          minX: this.coverBoxWidth - this.imgWidth * this.scale,
          maxX: 0,
          minY: this.coverBoxHeight - this.imgHeight * this.scale,
          maxY: 0,
        }

        bgPosition.x <= imgPositionRange.minX && (bgPosition.x = imgPositionRange.minX)
        bgPosition.y <= imgPositionRange.minY && (bgPosition.y = imgPositionRange.minY)
        bgPosition.x >= imgPositionRange.maxX && (bgPosition.x = imgPositionRange.maxX)
        bgPosition.y >= imgPositionRange.maxY && (bgPosition.y = imgPositionRange.maxY)

        this.coverBoxEle.style['background-image'] = `url(${ this.url })`
        this.coverBoxEle.style['background-size'] = `${ this.imgWidth * this.scale }px ${ this.imgHeight * this.scale }px`

        this.coverBoxEle.style['background-position-x'] = `${ bgPosition.x }px`
        this.coverBoxEle.style['background-position-y'] = `${ bgPosition.y }px`
      },
      mouseover (e) {
        this.coverBoxEle.style.display = 'block'
      },
      mouseleave () {
        this.coverBoxEle.style.display = 'none'
      },
    }
  }
</script>

<style lang="less" scoped>
  .pic-zoom {
    position: relative;
    display: flex;
    justify-content: space-around;
    width: 100%; height: 100%;

    .img {
      align-self: center;
      max-width: 100%; max-height: 100%;
    }

    .mouse-cover {
      position: fixed;
      min-width: 100px; min-height: 100px;
      width: 200px; height: 200px;
      cursor: move;
      background-repeat: no-repeat;
    }
  }
</style>