<template>
	<a-form>
		<a-form-item label="分类专栏">
			<a-input-search
				v-model:value="newGroup"
				placeholder="请输入专栏名称"
				enter-button="添加专栏"
				@search="addGroup"
			/>
			<div class="group-container">
				<a-checkbox-group
					v-if="groups && groups.length">
					<a-checkbox
						v-for="item in groups"
						:key="item.id"
						:value="item.id">
						{{ item.name }}
					</a-checkbox>
				</a-checkbox-group>
			</div>
		</a-form-item>
		<a-form-item label="文章类型">
			<a-select @change="handelSelect" default-value="origin">
				<a-select-option value="origin">原创</a-select-option>
				<a-select-option value="link">转载</a-select-option>
			</a-select>
		</a-form-item>
		<a-form-item label="发布形式">
			<a-radio-group v-model:value="publish">
				<a-radio value="public">公开</a-radio>
				<a-radio value="private">私密</a-radio>
				<a-radio value="ssr">订阅</a-radio>
			</a-radio-group>
		</a-form-item>
	</a-form>
</template>
<script>
	import { reactive, toRefs, watch, ref } from 'vue'

	const genRanStr = () => {
		return Math.random().toString(16).substr(2)
	}

	const defGroup = [
		{ id: 1, name: '前端' }
	]
	export default {
		name: 'ArticlePublish',
		setup() {
			const newGroup = ref('')
			const form = reactive({
				group: null,
				type: 'origin', // 文章类型
				publish: 'public', // 发布形式
			})
			// 专栏
			const groups = ref(defGroup)

			// 添加专栏
			const addGroup = () => {
				if (!newGroup.value || groups.value.findIndex(item => item.name === newGroup.value) > -1) {
					return
				}
				groups.value.unshift({
					id: genRanStr(),
					name: newGroup.value
				})
				newGroup.value = ''
			}

			watch(() => newGroup.value, (val) => {
				console.log(val)
			})
			return {
				groups,
				newGroup,
				...toRefs(form),
				addGroup
			}
		},
		methods: {
			handelSelect(val) {
				this.type = val
			},
			handleRadioSelect(val) {
				this.publish = val
			}
		}
	}
</script>
