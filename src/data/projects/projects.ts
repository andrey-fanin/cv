import {
	videoProduction,
	beats,
	vuelance,
	todo,
	solonika,
	onlineShop,
	bankApp
} from '../links/links'

import ru from '../../services/translates/ru'
import en from '../../services/translates/en'
import { currentLang } from '../../services/translates'
let t
currentLang === 'ru' ? (t = { ...ru }) : (t = { ...en })
// $i18n.locale
const projects = {
	react: {
		title: 'react',
		row: {
			onlineShop: {
				title: 'online shop',
				descr: t.projectsDescr.onlineShop,
				tags: [
					'react',
					'postgresql',
					'express.js',
					'node.js',
					'react-bootstrap',
					'supabase'
				],
				link: onlineShop,
				videoSrc: 'online-shop.webm'
			},
			bankApp: {
				title: 'bank app',
				descr: t.projectsDescr.bankApp,
				tags: ['react', 'react-query', 'chakra-ui'],
				link: bankApp,
				videoSrc: 'bank-app.mp4'
			}
		}
	},
	vue: {
		title: 'vue',
		row: {
			vuelance: {
				title: 'vuelance',
				descr: t.projectsDescr.vuelance,
				tags: ['vue', 'vuex', 'vue-router'],
				link: vuelance,
				videoSrc: 'vuelance.mp4'
			},
			todo: {
				title: 'todo',
				descr: t.projectsDescr.todo,
				tags: ['vue', 'pug'],
				link: todo,
				videoSrc: 'todo.mp4'
			}
		}
	},
	js: {
		title: 'js',
		row: {
			beats: {
				title: 'beats',
				descr: t.projectsDescr.beats,
				tags: ['js', 'jquery', 'html', 'css'],
				link: beats,
				videoSrc: 'beats.mp4'
			},
			soloNika: {
				title: 'solo-nika',
				descr: t.projectsDescr.soloNika,
				tags: ['js', 'php', 'bitrix'],
				link: solonika,
				videoSrc: 'solo-nika.mp4'
			}
		}
	},
	htmlCss: {
		title: 'html+css',
		row: {
			videoProduction: {
				title: 'video-production',
				descr: t.projectsDescr.videoProduction,
				tags: ['html', 'css'],
				link: videoProduction,
				videoSrc: 'video-production.mp4'
			}
		}
	}
}
export default projects
