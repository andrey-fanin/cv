<script setup>
import ProjectsRow from '@/components/common/ProjectsRow.vue'
import projects from '@/data/projects/projects.ts'
</script>

<template>
	<ul class="portfolio__projects-rows__list">
		<li class="portfolio__projects-row__item" v-for="row in projects">
			<projects-row :row="row" />
		</li>
	</ul>
</template>

<style lang="scss">
@import '@/styles/common/projects-list.scss';
</style>
