import Analysis from '../views/dashboard/Analysis'
import Dashboard from '../views/dashboard/Dashboard'
import Article from '../views/article/Article'
import ArticleList from '../views/article/ArticleList'
import Resources from '../views/resources/Resources'
import Images from '../views/resources/Images'
import Test from '../test/index'
import EmitTest from '../test/EmitTest'
import ArticleEditor from '../views/article/ArticleEditor'
import BlobUrl from '../test/BlobUrl'

const menu = [
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
	},
	{
		path: '/resources',
		menuText: '资源管理',
		component: Resources,
		redirect: '/resources/images',
		children: [
			{
				path: '/resources/images',
				component: Images,
				menuText: '图片管理'
			}
		]
	},
	{
		path: '/test',
		menuText: '测试组件',
		component: Test,
		redirect: '/test/emit',
		children: [
			{
				path: '/test/emit',
				component: EmitTest,
				menuText: 'Emit'
			},
			{
				path: '/test/blob-url',
				component: BlobUrl,
				menuText: 'BlobURL'
			}
		]
	}
]

const routes = [
	...menu,
	{
		path: '/',
		redirect: '/dashboard/analysis'
	},
	{
		path: '/article/:id',
		component: ArticleEditor
	}
]

// 为主菜单提供的导航数据
export const MENUS = routes.filter(item => {
	return item.menuText && item
})

export default routes
