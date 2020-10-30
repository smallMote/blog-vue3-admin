import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import 'ant-design-vue/dist/antd.css'
import './style'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.use(VueQuillEditor)

app.mount('#app')
