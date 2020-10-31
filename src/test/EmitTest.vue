<template>
	<ChildComponent @send="send"/>
</template>

<script>
	import { defineComponent } from 'vue'
	import ChildComponent from './EmitChildTest'

	export default defineComponent({
		name: 'EmitTest',
		components: {
			ChildComponent
		},
		setup() {
			const send = (val) =>{
				console.log(val)
			}

			return {
				send
			}
		}
	})
</script>
