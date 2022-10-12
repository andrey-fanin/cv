<script setup>
import { ref } from 'vue'

const props = defineProps({
	class: {
		type: String,
		default: ''
	}
})
let modifier = ref('')
if (props.class) {
	modifier = 'wrapper--' + props.class
}
</script>

<template>
	<div :class="['wrapper', modifier]">
		<slot />
	</div>
</template>

<style lang="scss">
@import '@/styles/common/wrapper.scss';
</style>
