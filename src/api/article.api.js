import request from './index'

export const getArticles = (limit = 10, offset = 0) => {
	return request.get('/articles', { params: { limit, offset } })
}
