<template>
  <section ref="container" class="water-fall-container">
    <slot class="water-fall-item"></slot>
  </section>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { waterFall, delay } from '../utils'
  export default defineComponent({
    name: 'WaterFallLayout',
    setup() {
      const container = ref(null)
      onMounted(() => {
        const innerWidth = document.documentElement.clientWidth || window.innerWidth
        let columns = getColumns(innerWidth)
        waterFall(container.value, columns)
        window.onresize = function (e) {
          columns = getColumns(e.target.innerWidth)
          delay(() => {
            waterFall(container.value, columns)
          }, 500)
        }
      })
      return {
        container
      }
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

<style lang="less" scoped>
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
