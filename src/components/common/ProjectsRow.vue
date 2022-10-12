<script setup>
import ProjectsItem from '@/components/common/ProjectsItem.vue'
defineProps({
	row: {
		type: Object
	}
})
</script>

<template>
	<template v-if="row.title === 'html+css'">
		<div class="">
			<a :id="row.title">
				<h2 class="projects-row-title">{{ row.title }}</h2>
			</a>
			<div class="projects-row__projects-list">
				<projects-item :item="item" v-for="item in row.row" />
			</div>
		</div>
		<div class="about__block">
			<h2 class="about__block-title">{{ $t('aboutMe.title') }}</h2>
			<div class="about__block-descr">
				<p>{{ $t('aboutMe.descrFirst') }}</p>
				<p>{{ $t('aboutMe.descrSecond') }}</p>
				<p>{{ $t('aboutMe.descrThird') }}</p>
			</div>
		</div>
	</template>
	<template v-else>
		<a :id="row.title">
			<h2 class="projects-row-title">{{ row.title }}</h2>
		</a>
		<ul class="projects-row__projects-list">
			<projects-item :item="item" v-for="item in row.row" />
		</ul>
	</template>
</template>

<style lang="scss">
@import '@/styles/common/projects-row.scss';
</style>
