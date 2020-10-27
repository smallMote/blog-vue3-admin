import Analysis from '../views/dashboard/Analysis'
import Dashboard from '../views/dashboard/Dashboard'
import Article from '../views/article/Article'
import ArticleList from '../views/article/ArticleList'

const routes = [
	{
		path: '/',
		redirect: '/dashboard/analysis'
	},
	{
		path: '/dashboard',
		menuText: 'Dashboard',
		component: Dashboard,
		redirect: '/dashboard/analysis',
		children: [
			{
				path: '/dashboard/analysis',
				component: Analysis,
				menuText: '分析页',
			}
		]
	},
	{
		path: '/article',
		menuText: '文章管理',
		component: Article,
		redirect: '/article/list',
		children: [
			{
				path: '/article/list',
				component: ArticleList,
				menuText: '文章列表'
			}
		]
	}
]

// 为主菜单提供的导航数据
export const MENUS = routes.filter(item => {
	return item.menuText && item
})

export default routes
