import request from './index'

const baseRest = (baseURL, action = 'query', params = {}, option = {}) => {
	let res = Promise.resolve({ data: null })
	switch (action) {
		case 'query': {
			const { limit, offset } = params
			res = request.get(baseURL, { params: { limit: limit || 20, offset: offset || 0 }, ...option })
			break
		}
		case 'create':
			res = request.post(baseURL, params, option)
			break
		case 'update': {
			const { id } = params
			delete params.id
			res = request.put(`${baseURL}/${id}`, params, option)
			break
		}
		case 'delete': {
			const { id } = params
			res = request.delete(`${baseURL}/${id}`, option)
			break
		}
	}
	return res
}

// 获取文章列表
export const getArticles = (limit = 10, offset = 0) => {
	return request.get('/articles', { params: { limit, offset } })
}

// 文章分组 Rest
export const articleGroups = (action = 'query', params = {}, option = {}) => {
	const baseURL = '/article/groups'
	return baseRest(baseURL, action, params, option)
}
