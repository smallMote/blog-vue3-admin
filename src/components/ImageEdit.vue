<template>
  <div class="image-edit">
    <img :src="url" :alt="title" />
    <p>{{ link }}</p>
    <p>{{ title }}</p>
    <p>{{ description }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageEdit',
  props: {
    url: String,
    link: String,
    title: String,
    description: String
  }
})
</script>
<style lang="less" scoped>
.image-edit {
  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
}
</style>
