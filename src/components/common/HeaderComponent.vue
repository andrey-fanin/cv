<script setup>
import WrapperComponent from '@/components/common/WrapperComponent.vue'
import ContainerComponent from '@/components/common/ContainerComponent.vue'
import { anchorsList, linksList } from '@/data/header/header'
import { inject } from 'vue'
const isMobile = inject('mobile')
</script>

<template>
	<wrapper-component class="header">
		<container-component class="header">
			<header class="header">
				<nav class="header__nav">
					<ul class="anchors__list">
						<li class="anchor__item" v-for="item in anchorsList" key="item.id">
							<a :href="'#' + item.name"> {{ item.name }}</a>
						</li>
					</ul>
					<ul class="links__list" v-if="!isMobile">
						<li class="link__item" v-for="item in linksList" key="item.id">
							<a :href="item.link"> {{ item.name }}</a>
						</li>
					</ul>
				</nav>
			</header>
		</container-component>
	</wrapper-component>
</template>

<style lang="scss">
@import './src/styles/common/header';
</style>
