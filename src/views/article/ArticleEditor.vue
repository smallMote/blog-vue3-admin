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
				<a-button type="primary">发布文章</a-button>
			</a-space>
		</div>
	</header>
	<Editor v-model:htmlSource="htmlSource" />
</template>

<script>
import { defineComponent } from 'vue'
import Editor from '../../components/Editor'

export default defineComponent({
	name: 'ArticleEditor',
	components: {
		Editor
	},
	data() {
		return {
			htmlSource: 'htmlSource'
		}
	},
	methods: {
		send(val) {
			console.log('customUpdate', val)
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
