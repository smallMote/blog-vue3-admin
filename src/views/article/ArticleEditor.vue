<template>
	<Editor :htmlSource="htmlSource" @send="send" />
	<section>
		{{ htmlSource }}
	</section>
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

</style>
