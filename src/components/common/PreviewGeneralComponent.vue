<script setup>
import WrapperComponent from '@/components/common/WrapperComponent.vue'
import ContainerComponent from '@/components/common/ContainerComponent.vue'
import SvgHeadingBigRu from '@/assets/svg/SvgHeadingBigRu.vue'
import SvgHeadingBigEn from '@/assets/svg/SvgHeadingBigEn.vue'
</script>

<template>
	<!--	<component :is="$i18n.locale === 'ru'" :value="'svg-heading-big'" />-->
	<!--	{{ $i18n.locale }}-->
	<wrapper-component>
		<container-component>
			<div class="preview__general">
				<div class="preview__general-title" :locale="$i18n.locale">
					<svg-heading-big-ru v-if="$i18n.locale === 'ru'" />
					<svg-heading-big-en v-else />
				</div>
				<p class="preview__general-info">
					{{ $t('preview.info') }}
				</p>
			</div>
		</container-component>
	</wrapper-component>
</template>

<style lang="scss">
@import '@/styles/common/preview-general.scss';
</style>
