import axios from 'axios'

const request = axios.create({
	baseURL: 'http://127.0.0.1:7001',
	headers: {
		'content-type': 'application/json' // ;charset=utf-8
	}
})

// 请求拦截
request.interceptors.request.use((config) => {
	return config
})

// 响应拦截
request.interceptors.response.use((res) => {
	return res
})

export default request
