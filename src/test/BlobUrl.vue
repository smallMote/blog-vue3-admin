<template>
	<div class="blob-url">
		<input @change="onFiledChange" type="file" />
		{{ src }}
		<img :src="src" alt="" />
	</div>
</template>

<script>
	// const _URL = (URL | webkitURL)
	function createUrl(arrayBufferWithPNG) {
		const blob = new Blob([arrayBufferWithPNG], { type: 'image/png' })
		return URL.createObjectURL(blob)
	}
	export default {
		name: 'BlobUrl',
		data() {
			return {
				src: ''
			}
		},
		methods: {
			onFiledChange(e) {
				const file = e.target.files[0]
				const url = createUrl(file)
				console.log(url)
				this.src = url
			}
		}
	}
</script>

<style scoped>
img {
	max-width: 450px;
}
</style>
