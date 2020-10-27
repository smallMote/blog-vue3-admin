import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import './style'

const app = createApp(App)

app.use(router)
app.use(Antd)

app.mount('#app')
