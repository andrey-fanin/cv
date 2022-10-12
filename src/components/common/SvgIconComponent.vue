<script setup>
import { ref } from 'vue'
import SvgTelegram from '@/assets/svg/SvgTelegram.vue'
import SvgPhone from '@/assets/svg/SvgPhone.vue'
import SvgMail from '@/assets/svg/SvgMail.vue'
import SvgGithub from '@/assets/svg/SvgGithub.vue'

defineProps({
	icon: String
})
</script>

<template>
	<template v-if="icon === 'telegram'">
		<svg-telegram />
	</template>
	<template v-else-if="icon === 'phone'">
		<svg-phone />
	</template>
	<template v-else-if="icon === 'mail'">
		<svg-mail />
	</template>
	<template v-else-if="icon === 'github'">
		<svg-github />
	</template>
</template>

<style lang="scss">
//@import "@/styles/";
</style>
