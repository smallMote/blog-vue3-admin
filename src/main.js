import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import request from './api'
import 'ant-design-vue/dist/antd.css'
import './style'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.config.globalProperties.request = request // 全局挂载

app.mount('#app')
