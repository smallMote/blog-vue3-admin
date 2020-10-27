import { h } from 'vue'
export default {
	name: 'Logo',
	props: {
		value: {
			type: String,
			default: 'zeroojs'
		}
	},
	render() {
		return h(
			'a',
			{
				innerText: this.value.toUpperCase(),
				className: 'logo'
			}
		)
	}
}
