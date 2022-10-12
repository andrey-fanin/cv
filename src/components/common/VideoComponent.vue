<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
	videoSrc: {
		type: String,
		default: ''
	}
})

function getVidUrl() {
	return new URL(`../../assets/video/${props.videoSrc}`, import.meta.url)
}
const video = ref(null)
const progress = ref(null)

function progressLoop() {
	setInterval(function () {
		progress.value.value = Math.round(
			(video.value.currentTime / video.value.duration) * 100
		)
	})
}

onMounted(() => {
	video.value.addEventListener('play', progressLoop)
})
onUnmounted(() => {
	video.value.removeEventListener('play', progressLoop)
})
</script>
<template>
	<video
		:src="getVidUrl()"
		preload="auto"
		ref="video"
		autoplay
		loop
		playsinline
		muted
	></video>
	<progress id="progress" ref="progress" max="100" value="0">Progress</progress>
</template>

<style scoped></style>
