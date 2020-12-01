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
		<article-publish/>
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

export default defineComponent({
	name: 'ArticleEditor',
	components: {
		Editor,
		ArticlePublish
	},
	setup() {
		const htmlSource = ref('')
		const visible = ref(false)

		// 发布文章
		const publish = () => {
			visible.value = true
		}
		// 关闭对话框
		const closeModel = () => {
			visible.value = false
		}

		return {
			visible,
			htmlSource,
			publish,
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
