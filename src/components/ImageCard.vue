<template>
  <a-card hoverable class="image-card">
    <template v-slot:cover>
      <img alt="example" :src="url" />
    </template>
    <a-card-meta :title="title">
      <template v-slot:description>
        {{ description }}
      </template>
    </a-card-meta>
    <template class="ant-card-actions" v-slot:actions>
      <copy-outlined key="copy"/>
      <edit-outlined key="edit" @click.prevent="openDialog(visible)"/>
      <delete-outlined key="del" @click="delImage()"/>
    </template>
  </a-card>
  <a-modal
    :title="title"
    :footer="null"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    width="80%"
  >
    <ImageEdit :url="url" :title="title" :description="description" :link="link"/>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'
import ImageEdit from './ImageEdit'
import { CopyOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'ImageCard',
  components: {
    ImageEdit,
    CopyOutlined,
    EditOutlined,
    DeleteOutlined
  },
  props: {
    id: [Number, String],
    url: {
      type: String,
      default: 'https://s2.ax1x.com/2019/07/09/Z6JKNd.jpg'
    },
    title: String,
    description: String,
    link: String
  },
  emits: ['del'],
  setup(props, ctx) {
    const confirmLoading = ref(false)
    const visible = ref(false)

    function openDialog() {
      visible.value = true
    }

    function handleOk() {
      confirmLoading.value = true
      const timer = setTimeout(() => {
        confirmLoading.value = false
        visible.value = false
        clearTimeout(timer)
      }, 500)
    }

    function delImage() {
      ctx.emit('del', props.id)
    }

    return {
      visible,
      confirmLoading,
      handleOk,
      delImage,
      openDialog
    }
  }
})


</script>

<style lang="less" scoped>
.image-card {
  img {
    display: block;
  }
}
</style>
