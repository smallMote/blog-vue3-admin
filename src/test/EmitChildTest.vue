<template>
	<a-button type="primary" @click="sendParensMessage()">Send</a-button>
</template>

<script>
	import { defineComponent } from 'vue'

	export default defineComponent({
		setup(props, ctx) {
			const sendParensMessage = () => {
				ctx.emit('send', 123)
			}
			return {
				sendParensMessage
			}
		}
	})
</script>

<style scoped>

</style>
