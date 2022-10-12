<script setup lang="ts">
import HeaderComponent from './components/common/HeaderComponent.vue'
import WrapperComponent from './components/common/WrapperComponent.vue'
import PreviewGeneralComponent from './components/common/PreviewGeneralComponent.vue'
import PortfolioComponent from './components/common/PortfolioComponent.vue'
import { computed, onMounted, provide, ref } from 'vue'
import FooterComponent from './components/common/FooterComponent.vue'

if (window.innerWidth < 500) {
	provide('mobile', true)
}
</script>

<template>
	<wrapper-component class="body">
		<section class="preview">
			<header-component />
			<preview-general-component />
		</section>
		<main class="portfolio">
			<portfolio-component />
		</main>
		<footer-component />
	</wrapper-component>
</template>

<style lang="scss">
@import '@/styles/main.scss';
</style>
