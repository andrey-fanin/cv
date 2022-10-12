<script setup>
import SvgArrow from '@/assets/svg/SvgArrow.vue'
import { computed, inject, onMounted, provide, ref, watch } from 'vue'
import VideoComponent from '@/components/common/VideoComponent.vue'

defineProps({
	item: {
		type: Object
	}
})
const isMobile = inject('mobile')
let showVid = ref(false)
</script>

<template>
	<li class="projects-row__project-item" @mouseover="showVid = true">
		<div
			class="project__item-content__tags project__item-content__tags--mobile"
			v-if="isMobile"
		>
			<ul class="tags__list">
				<li class="tag__item" v-for="tag in item.tags">
					{{ tag }}
				</li>
			</ul>
		</div>
		<div class="project__item-content__wrap">
			<div class="project__item-content">
				<div class="project__item-content__tags" v-if="!isMobile">
					<ul class="tags__list">
						<li class="tag__item" v-for="tag in item.tags">
							{{ tag }}
						</li>
					</ul>
				</div>
				<div class="project__item-content__info">
					<div class="content__info-text">
						<div class="content__info-text__title">{{ item.title }}</div>
						<p class="content__info-text__descr" v-for="descr in item.descr">
							{{ descr }}
						</p>
					</div>
					<a :href="item.link" class="content__info-link">
						<div class="info__link-arrow">
							<svg-arrow />
						</div>
					</a>
				</div>
				<!--				<div class="project__item-content__video">-->
				<keep-alive v-if="showVid && !isMobile">
					<video-component :videoSrc="item.videoSrc" />
				</keep-alive>
				<!--				</div>-->
			</div>
		</div>
	</li>
</template>

<style lang="scss">
@import '@/styles/common/project-item.scss';
</style>
