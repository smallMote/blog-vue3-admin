<template>
  <section class="water-fall-container">
    <slot></slot>
<!--    class="water-fall-item"-->
  </section>
</template>

<script>
  import { defineComponent, watch, nextTick, onUnmounted } from 'vue'
  import { waterFall, delay } from '../utils'
  export default defineComponent({
    name: 'WaterFallLayout',
    props: {
      done: Boolean
    },
    setup(props) {
      function resize(e) {
        const columns = getColumns(e.target.innerWidth)
        const container = document.querySelector('.water-fall-container')
        delay(() => {
          waterFall(container, columns)
        }, 500)
      }

      watch(() => props.done, (val) => {
        if (!val) return
        nextTick(() => {
          const innerWidth = document.documentElement.clientWidth || window.innerWidth
          let columns = getColumns(innerWidth)
          const container = document.querySelector('.water-fall-container')
          waterFall(container, columns)
          window.addEventListener('resize', resize)
        })
      }, { immediate: true })

      onUnmounted(() => {
        window.removeEventListener('resize', resize)
      })
    }
  })

  function getColumns(width) {
    let columns = 6
    if (width >= 1200) {
      columns = 6
    }
    if (width < 1550) {
      columns = 5
    }
    if (width < 1200) {
      columns = 4
    }
    if (width < 990) {
      columns = 3
    }
    if (width < 768) {
      columns = 2
    }
    if (width < 630) {
      columns = 1
    }
    return columns
  }
</script>

<style lang="less">
.water-fall-container {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: calc(100vh - 48px - 24px - 184px - 47px - 36px - 24px);
  & /deep/ .water-fall-item {
    position: absolute;
    /*min-height: 300px;*/
    transition: .4s ease;
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: fade(@theme-color, 20);
    border-radius: 2px;
  }
}
</style>
