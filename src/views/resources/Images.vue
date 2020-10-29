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
        <input ref="uploadImgs" multiple @change="handleImageInput" id="uploadImg" type="file"/>
        <a-space>
          <a-button @click="selectImgFiles()" type="primary">
            <UploadOutlined />
            上传图片
          </a-button>
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
  import { UploadOutlined } from '@ant-design/icons-vue'

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
      WaterFallLayout,
      UploadOutlined
    },
    setup() {
      const images = ref([])
      const keywords = ref('')
      const uploadImgs = ref(null)

      function onSearch(keywords = keywords.value) {
        images.value = searchImg(keywords)
      }

      function selectImgFiles() {
        uploadImgs.value.click()
      }

      function handleImageInput(e) {
        images.value = formatImgFiles(e.target.files)
      }

      return {
        images,
        keywords,
        filterMenu,
        uploadImgs,
        onSearch,
        selectImgFiles,
        handleImageInput

      }
    }
  }

  // 查找图片
  function searchImg(keywords) {
    console.log(keywords)
    return []
  }

  // 图片上传控件监听
  function formatImgFiles(files) {
    // console.log(e.target.files)
    const images = []
    files.forEach(item => {
      getImage(item).then(res => {
        images.push(res)
      })
    })

    function getImage(file) {
      const reader = new FileReader()
      const type = file.type
      const isTrueType = /png/.test(type)
      /* eslint-disable */
      return new Promise(resolve => {
        reader.onloadstart = function (e) {
          // console.log('开始读取....', e)
        }
        reader.onprogress = function (e) {
          // console.log('正在读取中....', e)
          if (!isTrueType) {
            console.log('类型不正确')
            return false
          }
        }
        reader.onabort = function (e) {
          // console.log('中断读取....', e)
          // console.log(file.type)
          if (!isTrueType) {
            console.log('类型不正确')
          }
        }
        reader.onerror = function (e) {
          // console.log('读取异常....', e)
        }
        reader.onload = function (e) {
          console.log('成功读取....')
          // console.log(e.target.result)
          resolve({
            reader,
            lastModified: file.lastModified,
            type: file.type,
            size: file.size,
            name: file.name,
            base64: e.target.result
          })
        }
        reader.readAsDataURL(file)
      })
      /* eslint-disable */
    }
    return Promise.all(images)
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


// 自定义上传按钮
.upload-btn {
  display: inline-block;
  line-height: 30px;
}
#uploadImg {
  width: 0;
  height: 0;
  visibility: hidden;
}
</style>
