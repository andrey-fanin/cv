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
	modifier = 'container--' + props.class
}
</script>

<template>
	<div :class="['container', modifier]"><slot /></div>
</template>

<style lang="scss">
@import '@/styles/common/container.scss';
</style>
