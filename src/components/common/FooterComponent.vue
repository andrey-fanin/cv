<script setup>
import { ref } from 'vue'
import SvgHeadingBigRu from '@/assets/svg/SvgHeadingBigRu.vue'
import SvgHeadingBigEn from '@/assets/svg/SvgHeadingBigEn.vue'
import SvgIconComponent from '@/components/common/SvgIconComponent.vue'
import contacts from '@/data/contacts/contacts'
</script>

<template>
	<div class="wrapper wrapper--footer">
		<div class="container container--footer">
			<footer class="footer">
				<div class="footer__title" :locale="$i18n.locale">
					<svg-heading-big-ru v-if="$i18n.locale === 'ru'" />
					<svg-heading-big-en v-else />
				</div>
				<div class="footer__contacts">
					<div class="footer__contacts-title">
						{{ $t('contacts.title') }}
					</div>
					<address class="footer__contacts-content">
						<ul class="footer__contacts-list">
							<li class="footer__contact-item" v-for="item in contacts">
								<a :href="item.link" class="item-link">
									<div class="item-icon">
										<svg-icon-component :icon="item.icon" />
									</div>
									<span class="item-text">{{ item.value }}</span>
								</a>
							</li>
						</ul>
					</address>
				</div>
			</footer>
		</div>
	</div>
</template>

<style lang="scss">
@import '@/styles/common/footer.scss';
</style>
