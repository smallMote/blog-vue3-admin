<template>
  <div id="editor"></div>
</template>

<script>
  import { defineComponent, onMounted } from 'vue'

  export default defineComponent({
    name: 'Editor',
    components: {
    },
    setup() {
      onMounted(() => {
        var quill = new window.Quill('#editor', {
          theme: 'snow'
        });
        console.log(quill)
      })
      return {}
    }
  })
</script>

<style lang="less" scoped>
</style>
