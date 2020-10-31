<template>
	<a-table :columns="columns" :data-source="articles">
		<template v-slot:title>
			<div class="flex flex-end">
				<a-input-search
					v-model:value="keywords"
					placeholder="输入文章标题查询"
					enter-button
					@search="onSearch"
					class="article-search"
				/>
			</div>
		</template>
		<template v-slot:articleTitle="{ text: title }">
			<a>{{ title }}</a>
		</template>
		<template v-slot:action>
			<a-space>
				<a-button size="small" type="primary">发布</a-button>
				<a-button size="small" type="danger">删除</a-button>
			</a-space>
		</template>
	</a-table>
</template>
<script>
	import { defineComponent, ref } from 'vue'
	const columns = [
		{ title: '文章标题', dataIndex: 'title', slots: { customRender: 'articleTitle' } },
		{ key: 'author', title: '作者', dataIndex: 'author' },
		{ key: 'group', title: '分组', dataIndex: 'group' },
		{ key: 'status', title: '状态', dataIndex: 'status' },
		{ key: 'comments', title: '评论数', dataIndex: 'comments' },
		{ key: 'views', title: '浏览数', dataIndex: 'views' },
		{ key: 'createAt', title: '创建时间', dataIndex: 'createAt' },
		{ key: 'pushAt', title: '发布时间', dataIndex: 'pushAt' },
		{ key: 'action', title: '操作', slots: { customRender: 'action' } }
	]
	export default defineComponent({
		name: 'ArticleList',
    setup() {
			const keywords = ref('')
			const articles = ref([
				{
					key: 1,
					id: 1,
					title: 'Javascript',
					author: 'Luckyoung',
					group: 'fontend',
					status: 'PUSHED',
					comments: 3,
					views: 50,
					createAt: +new Date(),
					pushAt: +new Date()
				}
			])
			// 搜索
			const onSearch = () => {
				keywords.value = ''
			}
			return {
				columns,
				articles,
				keywords,
				onSearch
			}
    }
	})
</script>
<style lang="less">
	.article-search {
		max-width: 400px;
	}
</style>
