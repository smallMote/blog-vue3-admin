<link rel="stylesheet" href="../../style/base.less">
<template>
  <header>
    <a-card>
      <div class="image-header-top flex">
        <p>
          <a href="">100</a>
          <span>图片</span>
        </p>
        <p>
          <a href="">100</a>
          <span>相册</span>
        </p>
      </div>
      <div class="image-header-search">
        <a-input-search
          v-model:value="keywords"
          placeholder="输入图片名称查找"
          enter-button
          @search="onSearch(keywords)"
        />
      </div>
      <div class="image-header-bottom">
        <a-space>
          <a-button type="primary">上传图片</a-button>
          <a-button type="primary">新建相册</a-button>
          <a-button type="primary">查看相册</a-button>
        </a-space>
      </div>
    </a-card>
  </header>
  <main>
    <div class="image-filter flex flex-between">
      <div class="image-filter-left">
        <a href="" v-for="item in filterMenu" :key="item.value" class="image-filter-item">{{ item.label }}</a>
      </div>
      <div class="image-filter-right">
        <a class="image-filter-item" href="">选择所有</a>
        <a class="image-filter-item" href="">已选 动作</a>
      </div>
    </div>
    <WaterFallLayout>
      <ImageCard v-for="item in 1" :key="`image-card-${item}`"/>
    </WaterFallLayout>
  </main>
</template>

<script>
  import { ref } from 'vue'
  import ImageCard from '../../components/ImageCard'
  import WaterFallLayout from '../../layout/WaterFallLayout'

  const filterMenu = [
    {
      value: 'new',
      label: '最新的'
    },
    {
      value: 'old',
      label: '最旧的'
    },
    {
      value: 'order',
      label: 'A-Z'
    }
  ]
  export default {
    name: 'Images',
    components: {
      ImageCard,
      WaterFallLayout
    },
    setup() {
      const images = ref([])
      const keywords = ref('')

      function onSearch(keywords = keywords.value) {
        images.value = searchImg(keywords)
      }

      return {
        images,
        keywords,
        filterMenu,
        onSearch
      }
    }
  }

  // 查找图片
  function searchImg(keywords) {
    console.log(keywords)
    return []
  }
</script>

<style scoped lang="less">
.image-header-top {
  font-size: 18px;
  span {
    color: #BBB;
    font-size: 12px;
    margin-left: 6px;
  }
  p:last-child {
    margin-left: 12px;
    padding-left: 12px;
    border-left: @border;
  }
}
.image-header-search {
  max-width: 360px;
  margin-bottom: 24px;
}

.image-filter {
  width: 100%;
  border-bottom: 1px solid @theme-color;
  padding: 12px 0;
  margin: 12px 0 24px;
}
.image-filter-item {
  color: initial;
  & ~ & {
    margin-left: 12px;
  }
  &.active {
    color: @theme-color;
  }
}

</style>
