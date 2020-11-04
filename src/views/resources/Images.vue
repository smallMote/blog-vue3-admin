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
        <input ref="uploadImgInput" multiple @change="handleImageInput" id="uploadImg" type="file"/>
        <a-space>
          <a-button @click="selectImgFiles()" type="primary">
            选择图片
          </a-button>
          <a-button type="primary">新建相册</a-button>
          <a-button type="primary">查看相册</a-button>
        </a-space>
        <div v-show="uploadImgs && uploadImgs.length" class="preview-groups flex">
          <div v-for="item in uploadImgs" :key="item.name" class="preview-group-item">
            <img :src="item.blobURL" :alt="item.name"/>
            <a href="" class="preview-del-btn" @click.prevent="delPreviewImages(item)">
              <DeleteOutlined />
            </a>
          </div>
        </div>
        <a-button
          v-show="uploadImgs && uploadImgs.length"
          type="primary"
          @click="handleUploadImgs()"
        >
          <UploadOutlined />
          上传图片
        </a-button>
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
    <WaterFallLayout :done="imageCardRender">
      <div
        v-for="item in images"
        :key="`image-card-${item.id}`"
        class="water-fall-item">
        <ImageCard
          :id="item.id"
          :url="item.url"
          :title="item.title"
          :description="item.description"
          :link="item.link"
          @del="delImgs"
        />
      </div>
<!--      @del="delImgs"-->
    </WaterFallLayout>
  </main>
</template>

<script>
  import { ref } from 'vue'
  import request from '../../api'
  import ImageCard from '../../components/ImageCard'
  import WaterFallLayout from '../../layout/WaterFallLayout'
  import { UploadOutlined, DeleteOutlined } from '@ant-design/icons-vue'

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
      UploadOutlined,
      DeleteOutlined
    },
    setup() {
      const images = ref([]) // 服务器图片
      const keywords = ref('')
      const uploadImgs = ref([]) // 上传的本地图片
      const uploadImgInput = ref(null) // 上传图片控件
      const selectedIds = ref([]) // 批量操作的图片id
      const imageCardRender = ref(false) // 图片组件是否渲染完成

      function onSearch(kws = keywords.value) {
        keywords.value = searchImg(kws)
      }

      function selectImgFiles() {
        uploadImgInput.value.click()
      }

      async function delImgs(id) {
        const res = await delImgsById(id || selectedIds.value)
        if (res && res.code === 200) {
          images.value = images.value.filter(item => {
            if (selectedIds.value && selectedIds.value.length) {
              return !selectedIds.value.includes(item.id)
            } else {
              return item.id !== id
            }
          })
        }
      }

      function delPreviewImages(item) {
        uploadImgs.value = images.value.filter(img => img.name !== item.name)
      }

      async function handleImageInput(e) {
        uploadImgs.value = await formatImgFiles(e.target.files)
        const res = await formatImgFiles(e.target.files)
        console.log(res)
        uploadImgs.value = res
      }

      async function handleUploadImgs() {
        const formData = new FormData()
        formData.append('file', uploadImgs.value)
        // formData.append('album', 'like')
        // formData.append('title', 'test other parmas')
        const res = await request.post('/images', formData, {
          headers: {
            'content-type': 'multipart/form-data;'
          }
        })
        if (!res) return
        console.log(res)
      }

      getImages().then(res => {
        images.value = res
        imageCardRender.value = true
      })

      return {
        images,
        keywords,
        uploadImgs,
        filterMenu,
        uploadImgInput,
        imageCardRender,
        delImgs,
        onSearch,
        handleUploadImgs,
        selectImgFiles,
        handleImageInput,
        delPreviewImages

      }
    }
  }

  // 查找图片
  function searchImg(keywords) {
    console.log(keywords)
    return []
  }

  // 删除图片
  async function delImgsById(ids) {
    if (/string|number/.test(typeof ids)) {
      ids = [ ids ]
    }
    const res = await request.delete(`/images/${ids.toString()}`)
    return { code: res.status, message: res.message }
  }

  // 获取图片列表
  async function getImages() {
    const images = await request.get('/images')
    return images.data
  }

  // 图片上传控件监听
  async function formatImgFiles(files) {
    function getImage(file) {
      const reader = new FileReader()
      const type = file.type
      const isTrueType = /png/.test(type)
      /* eslint-disable */
      return new Promise(resolve => {
        reader.onloadstart = function (e) {
          // console.log('开始读取....', e)
        }
        reader.onprogress = function () {
          // console.log('正在读取中....', e)
          if (!isTrueType) {
            console.log('类型不正确')
            return false
          }
        }
        reader.onabort = function () {
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
            // reader,
            lastModified: file.lastModified,
            type: file.type,
            size: file.size,
            name: file.name,
            // base64: e.target.result,
            blobURL: URL.createObjectURL(new Blob([file]))
          })
        }
        reader.readAsDataURL(file)
      })
      /* eslint-disable */
    }
    return Promise.all([...files].map(item => getImage(item)))
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

.preview-groups {
  margin: 24px 0;
}
.preview-group-item ~ .preview-group-item {
  margin-left: 12px;
}
.preview-group-item {
  width: 100px;
  height: 100px;
  position: relative;
  border: 1px solid fade(@theme-color, 50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: fade(@theme-color, 10);
  overflow: hidden;

  &:hover {
    border-color: transparent;
    img {
      filter: blur(1px);
    }
    .preview-del-btn {
      opacity: 1;
    }
  }

  img {
    width: 100%;
  }

  .preview-del-btn {
    position: absolute;
    width: 100px;
    height: 100px;
    display: block;
    text-align: center;
    line-height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: fade(#000, 30);
    font-size: 24px;
    opacity: 0;
    transition: .3s ease;
  }
}
</style>
