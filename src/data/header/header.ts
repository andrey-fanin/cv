import ru from '../../services/translates/ru'
import en from '../../services/translates/en'
import { currentLang } from '../../services/translates'

let t
currentLang === 'ru' ? (t = { ...ru.header }) : (t = { ...en.header })

const anchorsList = [
	{
		id: 1,
		name: 'react'
	},
	{
		id: 2,
		name: 'vue'
	},
	{
		id: 3,
		name: 'js'
	},
	{
		id: 2,
		name: 'html+css'
	}
]
const linksList = [
	{
		id: 1,
		name: 'github',
		link: 'https://github.com/andrey-fanin'
	},
	{
		id: 2,
		name: t.downloadCv,
		link: t.link
	}
]

export { anchorsList, linksList }
