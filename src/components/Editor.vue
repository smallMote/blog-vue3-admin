<template>
  <div id="editor-container"></div>
  <a-button type="primary" @click="changeParents()">Update</a-button>
</template>

<script>
  import { defineComponent, onMounted, onUnmounted, reactive, watch } from 'vue'
  // 工具栏配置
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],                              // remove formatting button
    ['link'],
    ['image'],
    [{ 'video': { } }],
  ]

  export default defineComponent({
    name: 'Editor',
    props: {
      htmlSource: String
    },
    setup(props, ctx) {
      let quill = null
      let editorContainer = null
      const quillInfo = reactive({
        range: {},
        content: props.modelValue
      })

      onMounted(() => {
        editorContainer = document.querySelector('#editor-container')
        const editor = document.createElement('div')
        editor.setAttribute('id', 'editor')
        editorContainer.append(editor)
        quill = new window.Quill('#editor', {
          theme: 'snow',
          modules: {
            toolbar: toolbarOptions
          }
        })
        // 添加获取 html 自定义函数
        window.Quill.prototype.getSource = function() {
          return this.root.innerHTML
        }
        handleSelection(quill, quillInfo)
        customUploadImage(quill)
      })

      onUnmounted(() => {
        const editor = document.querySelector('#editor')
        if (editorContainer && editor) {
          editorContainer.removeChild(editor)
        }
      })

      const getQuillContent = () => {
        getContents(quill)
      }

      const changeParents = () => {
        console.log('changeParents')
        ctx.emit('send', 123)
      }

      watch(() => quillInfo.content, (c) => {
        console.log('c', c)
      })
      return {
        getQuillContent,
        changeParents
      }
    }
  })

  // 监听光标位置
  function handleSelection(quill, quillInfo) {
    quill.on('text-change', () => {
      quillInfo.content = quill.getSource()
    })
    quill.on('selection-change', (range) => {
      quillInfo.range = range
    })
  }

  // 插入图片
  function customUploadImage(quill) {
    quill.getModule('toolbar').addHandler('image', (e) => {
      console.log('自定义上传图片', e)
    })
  }

  // 获取文章内容
  function getContents(quill) {
    console.log(quill.getSource())
  }
</script>

<style lang="less">
  #editor {
    min-height: 500px;
  }
</style>
