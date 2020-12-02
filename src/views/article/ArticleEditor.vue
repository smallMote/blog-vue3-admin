<template>
	<header CLASS="article-editor-header">
		<div class="flex">
			<a-input
				addon-before="文章标题"
				aria-placeholder="请输入文章标题"
				:placeholder="new Date().toLocaleString()"
				class="article-title-input"
			/>
			<a-space>
				<a-button ghost type="primary">保存到草稿箱</a-button>
				<a-button type="primary" @click="publish()">发布文章</a-button>
			</a-space>
		</div>
	</header>
	<Editor v-model:htmlSource="htmlSource" />
	<a-modal
		title="文章其他信息"
		v-model:visible="visible"
		destroyOnClose
		keyboard>
		<!--		发布前的表单-->
		<article-publish
			:article-groups="groups"
			@get-groups="getGroups"/>
		<template v-slot:footer>
			<a-button @close="closeModel()">取消</a-button>
			<a-button type="dashed">保存为草稿</a-button>
			<a-button type="primary">发布文章</a-button>
		</template>
	</a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Editor from '../../components/Editor'
import ArticlePublish from '../../components/article/ArticlePublish'
import { articleGroups } from '../../api/article.api'

export default defineComponent({
	name: 'ArticleEditor',
	components: {
		Editor,
		ArticlePublish
	},
	setup() {
		const htmlSource = ref('')
		const visible = ref(false)
		const groups = ref([])

		// 发布文章
		const publish = () => {
			visible.value = true
		}
		// 关闭对话框
		const closeModel = () => {
			visible.value = false
		}

		// 获取文章专栏
		const getGroups = () => {
			articleGroups().then(res => {
				groups.value = res.data
			})
		}
		getGroups()

		return {
			groups,
			visible,
			htmlSource,
			publish,
			getGroups,
			closeModel
		}
	}
})
</script>

<style lang="less" scoped>
	.article-editor-header {
		margin-bottom: 24px;
		.article-title-input {
			margin-right: 8px;
		}
	}
</style>
