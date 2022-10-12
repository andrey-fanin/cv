import { createI18n } from 'vue-i18n'
import ru from './ru/index'
import en from './en/index'

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop: string) => searchParams.get(prop)
})
// @ts-ignore
export const currentLang = params.lang

const i18n = createI18n({
	locale: currentLang === 'ru' ? 'ru' : 'en',
	messages: {
		ru,
		en
	}
})

export default i18n
